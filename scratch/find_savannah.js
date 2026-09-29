require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const prods = await mongoose.connection.collection('products').find({}).toArray();
  const matched = prods.filter(p => {
    const s = JSON.stringify(p).toLowerCase();
    return s.includes('savannah');
  });
  console.log('Products mentioning savannah:', matched.length);
  matched.forEach(p => console.log(' -', p.slug, p.code, p.name?.us));
  process.exit(0);
}

main().catch(console.error);
