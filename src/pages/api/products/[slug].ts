import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import { invalidateCache } from '@/lib/cache';
import Product, { type IProduct } from '@/models/Product';
import mongoose from 'mongoose';

type LeanProductRecord = Omit<IProduct, keyof mongoose.Document> & {
  _id?: mongoose.Types.ObjectId;
};

type RelatedProductLean = {
  _id?: mongoose.Types.ObjectId;
  productId?: string;
  name?: IProduct['name'];
  slug?: string;
  code?: string;
  image?: string;
  images?: string[];
  category?: IProduct['category'];
  material?: IProduct['material'];
  collection?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid slug parameter' });
  }

  try {
    await dbConnect();

    const orConditions: Record<string, unknown>[] = [{ slug }, { code: slug }, { productId: slug }];
    if (mongoose.isValidObjectId(slug)) {
      orConditions.push({ _id: slug });
    }

    if (req.method === 'GET') {
      const product = (await Product.findOneAndUpdate(
        { $or: orConditions },
        { $inc: { views: 1 } },
        { new: true, lean: true }
      )) as LeanProductRecord | null;

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Fetch up to 4 related products (same category or material) in parallel
      const relatedQuery: Record<string, unknown> = {
        _id: { $ne: product._id },
        $or: [] as Record<string, unknown>[],
      };
      const orConds: Record<string, unknown>[] = [];
      if (product.category?.us) orConds.push({ 'category.us': product.category.us });
      if (product.material?.us) orConds.push({ 'material.us': product.material.us });
      if (orConds.length > 0) relatedQuery.$or = orConds;

      const relatedProducts = orConds.length > 0
        ? ((await Product.find(relatedQuery)
            .select('productId name slug code image images category material collection')
            .limit(4)
            .lean()) as unknown as RelatedProductLean[])
        : [];

      const formatted = {
        ...product,
        id: product.productId || product._id?.toString(),
      };
      
      return res.status(200).json({
        ...formatted,
        _related: relatedProducts.map((p) => ({
          ...p,
          id: p.productId || p._id?.toString(),
        })),
      });
    } 

    if (req.method === 'PUT') {
      const updatedData = { ...req.body };
      
      // Don't overwrite _id or productId
      delete updatedData._id;
      if (updatedData.id) delete updatedData.id;

      if (Array.isArray(updatedData.collection)) {
        updatedData.collection = updatedData.collection.join(', ');
      }

      console.log("[PUT] Update payload:", updatedData);
      
      let updateResult: mongoose.UpdateWriteOpResult | null = null;
      try {
        updateResult = await Product.updateOne(
          { $or: orConditions },
          { $set: updatedData },
          { runValidators: true }
        );
      } catch (err) {
        console.error("[PUT] updateOne ValidationError:", err);
        return res.status(500).json({ error: String(err) });
      }

      const productIdToFind = updateResult && updateResult.acknowledged && updateResult.matchedCount > 0 ? 
        (updatedData.slug || slug) : slug;

      const lookupConditions: Record<string, unknown>[] = [
        { slug: productIdToFind },
        { code: productIdToFind },
        { productId: productIdToFind },
      ];
      if (typeof productIdToFind === 'string' && mongoose.isValidObjectId(productIdToFind)) {
        lookupConditions.push({ _id: productIdToFind });
      }

      const updatedProduct = (await Product.findOne({ 
        $or: lookupConditions
      }).lean()) as LeanProductRecord | null;

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found to update' });
      }

      invalidateCache('featured-products-public');
      invalidateCache('products-list-all');

      return res.status(200).json({
        ...updatedProduct,
        id: updatedProduct.productId || updatedProduct._id?.toString(),
      });
    }

    if (req.method === 'DELETE') {
      const deleted = await Product.findOneAndDelete({ $or: orConditions });

      if (!deleted) {
        return res.status(404).json({ error: 'Product not found to delete' });
      }

      invalidateCache('featured-products-public');
      invalidateCache('products-list-all');

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
}
