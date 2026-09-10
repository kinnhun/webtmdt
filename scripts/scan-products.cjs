const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://dhtadmin:DHT2344Mongo@180.93.36.237:27017/dht_furniture?authSource=dht_furniture';

async function scanAllProducts() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const products = await db.collection('products').find({}).toArray();

  console.log(`Total products scanned: ${products.length}`);
  for (const p of products) {
    const raw = JSON.stringify(p);
    const banned = [];
    if (/medium-end/i.test(raw)) banned.push('medium-end');
    if (/JDD/i.test(raw)) banned.push('JDD');
    if (/226\s*Go\s*Dua|226\s*Gò\s*Dưa/i.test(raw)) banned.push('226 Go Dua');
    if (/QL19|Quoc\s*lo\s*19|Quốc\s*lộ\s*19/i.test(raw)) banned.push('QL19');
    if (/trung\s*cấp/i.test(raw)) banned.push('trung cấp');

    if (banned.length > 0) {
      console.log(`[ALERT] Product ${p.slug} (${p._id}): ${banned.join(', ')}`);
    }
  }
  await mongoose.disconnect();
}

scanAllProducts().catch(console.error);
