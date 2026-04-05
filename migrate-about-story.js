const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webtmdt';

async function migrateStory() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const db = mongoose.connection.useDb('dht_furniture');
    const AboutContent = db.collection('aboutcontents');

    const doc = await AboutContent.findOne({});
    if (!doc) {
      console.log('No about content found in the database. Nothing to migrate.');
      process.exit(0);
    }

    if (doc.story) {
      const { paragraph1, paragraph2, paragraph3, content } = doc.story;
      
      // If content already exists and is unempty, maybe skip? We'll overwrite just to be sure if paragraph1 exists
      if (paragraph1 || paragraph2 || paragraph3) {
        console.log('Found legacy paragraph1, paragraph2, paragraph3. Merging into content...');
        
        const newContent = {
          us: [paragraph1?.us, paragraph2?.us, paragraph3?.us].filter(Boolean).join('<br/><br/>'),
          uk: [paragraph1?.uk, paragraph2?.uk, paragraph3?.uk].filter(Boolean).join('<br/><br/>'),
          vi: [paragraph1?.vi, paragraph2?.vi, paragraph3?.vi].filter(Boolean).join('<br/><br/>'),
        };

        await AboutContent.updateOne(
          { _id: doc._id },
          { 
            $set: { 'story.content': newContent },
            $unset: { 
              'story.paragraph1': "",
              'story.paragraph2': "",
              'story.paragraph3': ""
            }
          }
        );
        console.log('Successfully migrated story paragraphs to single content field.');
      } else {
         console.log('Already migrated or no legacy paragraphs found.');
      }
    } else {
      console.log('No story section found.');
    }

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateStory();
