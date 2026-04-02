import dbConnect from './src/lib/mongodb';
import Product from './src/models/Product';
import mongoose from 'mongoose';

async function run() {
  await dbConnect();
  try {
    const slug = 'beeterwe';
    const orConditions = [{ slug }, { code: slug }, { productId: slug }];
    
    console.log("Before:", await Product.findOne({$or: orConditions}).select('name slug'));
    
    const update = await Product.updateOne({$or: orConditions}, { $set: { "name.us": "TEST TWO" } }, { runValidators: true });
    console.log("UpdateOne object:", update);
    
    console.log("After:", await Product.findOne({$or: orConditions}).select('name slug'));
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.disconnect();
  }
}
run();
