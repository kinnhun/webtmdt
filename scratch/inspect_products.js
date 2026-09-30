const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkSample() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({}, { strict: false }));
  
  const sample = await Product.find({ slug: { $in: ['amalfi-lounge-collection', 'benson-lounge-collection', 'seina-table', 'balemora-lounge-collection'] } }).lean();
  for (const p of sample) {
    console.log('=== ' + p.slug + ' ===');
    console.log('name:', p.name);
    console.log('code:', p.code);
    console.log('category:', p.category);
    console.log('material:', p.material);
    console.log('dimensions:', p.dimensions);
    console.log('attributes:', p.attributes);
    console.log('specifications:', p.specifications);
  }
  await mongoose.disconnect();
}
checkSample();
