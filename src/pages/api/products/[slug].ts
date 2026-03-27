import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { productsData } from '@/data/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid slug parameter' });
  }

  try {
    await dbConnect();

    if (req.method === 'GET') {
      // Find by slug, code, or productId
      const product = await Product.findOne({
        $or: [{ slug }, { code: slug }, { productId: slug }],
      }).lean();

      if (!product) {
        // Fallback to local data for demo flexibility
        const localProduct = productsData.find(
          (p) => p.slug === slug || p.id === slug || p.code === slug
        );
        if (localProduct) {
          return res.status(200).json(localProduct);
        }
        return res.status(404).json({ error: 'Product not found' });
      }

      // Format for frontend
      const formatted = {
        ...product,
        id: product.productId || product._id?.toString(),
      };
      
      return res.status(200).json(formatted);
    } 

    if (req.method === 'PUT') {
      const updatedData = req.body;
      
      // We don't want to accidentally overwrite _id or productId
      delete updatedData._id;
      if (updatedData.id) delete updatedData.id;

      const updatedProduct = await Product.findOneAndUpdate(
        { $or: [{ slug }, { code: slug }, { productId: slug }] },
        { $set: updatedData },
        { new: true, runValidators: true }
      ).lean();

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found to update' });
      }

      return res.status(200).json({
        ...updatedProduct,
        id: updatedProduct.productId || updatedProduct._id?.toString(),
      });
    }

    if (req.method === 'DELETE') {
      const deleted = await Product.findOneAndDelete({
        $or: [{ slug }, { code: slug }, { productId: slug }],
      });

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
