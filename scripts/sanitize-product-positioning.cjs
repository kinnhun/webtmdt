const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://dhtadmin:DHT2344Mongo@180.93.36.237:27017/dht_furniture?authSource=dht_furniture';

async function sanitizeProducts() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  // 1. Amalfi
  const amalfi = await db.collection('products').findOne({ slug: 'amalfi-lounge-collection' });
  if (amalfi && amalfi.longDescription) {
    const us = amalfi.longDescription.us
      .replace(/medium-end/gi, 'premium')
      .replace(/easy&nbsp;long-term&nbsp;maintenance/gi, 'effortless&nbsp;long-term&nbsp;performance');
    const uk = amalfi.longDescription.uk
      .replace(/medium-end/gi, 'premium')
      .replace(/easy&nbsp;long-term&nbsp;maintenance/gi, 'effortless&nbsp;long-term&nbsp;performance');
    const vi = amalfi.longDescription.vi
      .replace(/không gian khách sạn\s*và\s*dân cư\s*trung cấp/gi, 'các dự án nghỉ dưỡng cao cấp và không gian dân cư chuẩn mực')
      .replace(/trung cấp/gi, 'cao cấp');
    
    await db.collection('products').updateOne(
      { _id: amalfi._id },
      { $set: { 'longDescription.us': us, 'longDescription.uk': uk, 'longDescription.vi': vi } }
    );
    console.log('✓ Sanitized amalfi-lounge-collection');
  }

  // 2. Santos
  const santos = await db.collection('products').findOne({ slug: 'santos-lounge-collection-dht17-141' });
  if (santos && santos.longDescription) {
    const us = santos.longDescription.us
      .replace(/middle-end/gi, 'commercial and hospitality')
      .replace(/medium-end/gi, 'commercial and hospitality');
    const uk = santos.longDescription.uk
      .replace(/middle-end/gi, 'commercial and hospitality')
      .replace(/medium-end/gi, 'commercial and hospitality');
    const vi = santos.longDescription.vi
      .replace(/trung cấp/gi, 'dự án thương mại');

    await db.collection('products').updateOne(
      { _id: santos._id },
      { $set: { 'longDescription.us': us, 'longDescription.uk': uk, 'longDescription.vi': vi } }
    );
    console.log('✓ Sanitized santos-lounge-collection-dht17-141');
  }

  // 3. Bondi
  const bondi = await db.collection('products').findOne({ slug: 'bondi-lougne-collection' });
  if (bondi && bondi.longDescription) {
    const us = bondi.longDescription.us
      .replace(/medium-end/gi, 'high-end')
      .replace(/middle-end/gi, 'high-end');
    const uk = bondi.longDescription.uk
      .replace(/medium-end/gi, 'high-end')
      .replace(/middle-end/gi, 'high-end');
    const vi = bondi.longDescription.vi
      .replace(/trung cấp/gi, 'quốc tế');

    await db.collection('products').updateOne(
      { _id: bondi._id },
      { $set: { 'longDescription.us': us, 'longDescription.uk': uk, 'longDescription.vi': vi } }
    );
    console.log('✓ Sanitized bondi-lougne-collection');
  }

  console.log('All product positioning descriptions updated.');
  await mongoose.disconnect();
}

sanitizeProducts().catch(console.error);
