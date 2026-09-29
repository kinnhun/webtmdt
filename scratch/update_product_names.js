const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI in .env.local');
    process.exit(1);
  }

  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const col = db.collection('products');

  console.log('Connected to MongoDB. Updating product names and slugs according to Audit Issue 19 & 20...');

  // 1. BONDI: LOUGNE -> LOUNGE
  const bondiRes = await col.updateOne(
    { $or: [{ productId: 'BLC-COL-0413-5801' }, { code: 'BLC-COL-0609' }, { slug: 'bondi-lougne-collection' }] },
    {
      $set: {
        'name.us': 'BONDI LOUNGE COLLECTION',
        'name.uk': 'BONDI LOUNGE COLLECTION',
        'name.vi': 'BỘ SƯU TẬP BONDI LOUNGE',
        slug: 'bondi-lounge-collection',
      }
    }
  );
  console.log('1. Bondi update result:', bondiRes.modifiedCount);

  // 2. MOBLEY: DINNING -> DINING
  const mobleyRes = await col.updateOne(
    { $or: [{ productId: 'MC-COL-0414' }, { code: 'MDC-COL-0607' }, { slug: 'mobley-dinning-collection' }] },
    {
      $set: {
        'name.us': 'MOBLEY DINING COLLECTION',
        'name.uk': 'MOBLEY DINING COLLECTION',
        'name.vi': 'BỘ SƯU TẬP BÀN ĂN MOBLEY',
        slug: 'mobley-dining-collection',
      }
    }
  );
  console.log('2. Mobley update result:', mobleyRes.modifiedCount);

  // 3. WESLEY: DINNING -> DINING
  const wesleyRes = await col.updateOne(
    { $or: [{ productId: 'WDC-COL-0413' }, { code: 'WDC-COL-0607' }, { slug: 'wesley-dinning-collection' }] },
    {
      $set: {
        'name.us': 'WESLEY DINING COLLECTION',
        'name.uk': 'WESLEY DINING COLLECTION',
        'name.vi': 'BỘ SƯU TẬP BÀN ĂN WESLEY',
        slug: 'wesley-dining-collection',
      }
    }
  );
  console.log('3. Wesley update result:', wesleyRes.modifiedCount);

  // 4. RETANGLE: RETANGLE TABLE -> RECTANGULAR TABLE
  const retangleRes = await col.updateOne(
    { $or: [{ productId: 'RT-TAB-0414' }, { code: 'RT-TAB-0607' }, { slug: 'retangle-table' }] },
    {
      $set: {
        'name.us': 'RECTANGULAR TABLE',
        'name.uk': 'RECTANGULAR TABLE',
        'name.vi': 'BÀN CHỮ NHẬT NGOÀI TRỜI',
        slug: 'rectangular-table',
      }
    }
  );
  console.log('4. Retangle update result:', retangleRes.modifiedCount);

  // 5. Clean up Vietnamese names for tables & collections
  // Seina Table
  await col.updateOne(
    { $or: [{ productId: 'ST-TAB-0414' }, { code: 'ST-TAB-0607' }] },
    { $set: { 'name.vi': 'BÀN NGOÀI TRỜI SEINA' } }
  );

  // Haymont Table
  await col.updateOne(
    { $or: [{ productId: 'HT-TAB-0414' }, { code: 'HT-TAB-0607' }] },
    { $set: { 'name.vi': 'BÀN NGOÀI TRỜI HAYMONT' } }
  );

  // Ashton Lounge Collection
  await col.updateOne(
    { $or: [{ productId: 'ALC-COL-0413' }, { code: 'ALC-COL-0607' }] },
    { $set: { 'name.vi': 'BỘ SƯU TẬP ASHTON LOUNGE' } }
  );

  // Timor Losil Collection
  await col.updateOne(
    { $or: [{ productId: 'TLC-COL-0416' }, { code: 'TLC-COL-0607' }] },
    { $set: { 'name.vi': 'BỘ SƯU TẬP TIMOR LOSIL' } }
  );

  // Santos Lounge Collection (trim trailing spaces)
  await col.updateOne(
    { $or: [{ productId: 'SD0-TAU-0413' }, { code: 'SLC-COL-0608' }] },
    { $set: { 'name.us': 'SANTOS LOUNGE COLLECTION', 'name.uk': 'SANTOS LOUNGE COLLECTION' } }
  );

  await col.updateOne(
    { $or: [{ productId: 'SLC-COL-0413' }, { code: 'SLC-DHT-06012' }] },
    { $set: { 'name.us': 'SANTOS LOUNGE COLLECTION DHT17-141', 'name.uk': 'SANTOS LOUNGE COLLECTION DHT17-141' } }
  );

  console.log('Product updates completed successfully!');

  // Verify
  const verified = await col.find({
    slug: { $in: ['bondi-lounge-collection', 'mobley-dining-collection', 'wesley-dining-collection', 'rectangular-table', 'brooksc-lounge-collection'] }
  }).toArray();
  console.log('Verified products in DB count:', verified.length);
  verified.forEach(v => {
    console.log(`- Slug: ${v.slug} | Code: ${v.code} | US: ${v.name?.us} | VI: ${v.name?.vi}`);
  });

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
