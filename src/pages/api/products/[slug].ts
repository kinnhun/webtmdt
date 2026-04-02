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

      // Ensure collection is a plain string (schema: String, not I18nText)
      if (Array.isArray(updatedData.collection)) {
        updatedData.collection = updatedData.collection.join(', ');
      }

      const updatedProduct = await Product.findOneAndUpdate(
        { $or: orConditions },
        { $set: updatedData },
        { new: true, runValidators: true }
      ).lean();

      if (!updatedProduct) {
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
