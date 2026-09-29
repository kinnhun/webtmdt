require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  const balemora = await mongoose.connection.collection('products').findOne({ slug: 'balemora-lounge-collection' });
  const seina = await mongoose.connection.collection('products').findOne({ slug: 'seina-table' });
  
  console.log('=== BALEMORA / BALMORA ===');
  console.log('Slug:', balemora?.slug);
  console.log('Code:', balemora?.code);
  console.log('Name:', JSON.stringify(balemora?.name, null, 2));
  console.log('Desc:', JSON.stringify(balemora?.description, null, 2));
  console.log('LongDesc:', JSON.stringify(balemora?.longDescription, null, 2));
  console.log('Attributes:', JSON.stringify(balemora?.attributes, null, 2));

  console.log('\n=== SEINA / SIENA ===');
  console.log('Slug:', seina?.slug);
  console.log('Code:', seina?.code);
  console.log('Name:', JSON.stringify(seina?.name, null, 2));
  console.log('Desc:', JSON.stringify(seina?.description, null, 2));
  console.log('LongDesc:', JSON.stringify(seina?.longDescription, null, 2));
  console.log('Attributes:', JSON.stringify(seina?.attributes, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
