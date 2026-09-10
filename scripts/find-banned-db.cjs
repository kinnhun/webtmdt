const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://dhtadmin:DHT2344Mongo@180.93.36.237:27017/dht_furniture?authSource=dht_furniture';

async function checkDb() {
  await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));

  for (const c of collections) {
    const regexDocs = await db.collection(c.name).find({
      $or: [
        { description: /medium-end/i },
        { fullDescription: /medium-end/i },
        { content: /medium-end/i },
        { excerpt: /medium-end/i },
        { story: /medium-end/i },
        { details: /medium-end/i },
        { overview: /medium-end/i }
      ]
    }).toArray();
    if (regexDocs.length) {
      console.log(`FOUND in collection '${c.name}':`, regexDocs.map(d => ({
        id: d._id,
        slug: d.slug,
        title: d.title || d.name,
        matchField: Object.keys(d).find(k => typeof d[k] === 'string' && d[k].includes('medium-end'))
      })));
    }
  }
  await mongoose.disconnect();
}

checkDb().catch(console.error);
