import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import mongoose from 'mongoose';

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
      const product = await Product.findOne({ $or: orConditions }).lean();

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const formatted = {
        ...product,
        id: (product as any).productId || product._id?.toString(),
      };
      
      return res.status(200).json(formatted);
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
      
      let updateResult: any = null;
      try {
        updateResult = await Product.updateOne(
          { $or: orConditions },
          { $set: updatedData },
          { runValidators: true }
        );
        console.log("[PUT] updateOne result:", updateResult);
      } catch (err) {
        console.error("[PUT] updateOne ValidationError:", err);
        return res.status(500).json({ error: String(err) });
      }

      const productIdToFind = updateResult && updateResult.acknowledged && updateResult.matchedCount > 0 ? 
        (updatedData.slug || slug) : slug;

      const updatedProduct = await Product.findOne({ 
        $or: [
          { slug: productIdToFind }, 
          { code: productIdToFind }, 
          { productId: productIdToFind }
        ].concat(mongoose.isValidObjectId(productIdToFind) ? [{ _id: productIdToFind }] as any : [])
      }).lean();

      console.log("[PUT] final findOne result exists?", !!updatedProduct);

      if (!updatedProduct) {
        console.log("[PUT] returning 404 explicitly");
        return res.status(404).json({ error: 'Product not found to update' });
      }

      return res.status(200).json({
        ...updatedProduct,
        id: (updatedProduct as any).productId || updatedProduct._id?.toString(),
      });
    }

    if (req.method === 'DELETE') {
      const deleted = await Product.findOneAndDelete({ $or: orConditions });

      if (!deleted) {
        return res.status(404).json({ error: 'Product not found to delete' });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
}
