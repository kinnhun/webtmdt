import { config } from 'dotenv';
config({ path: '.env.local' });
import mongoose from 'mongoose';

const HomeContentSchema = new mongoose.Schema({
  factoryVideoUrl: { type: String, default: '' },
}, { timestamps: true });

const HomeContent = mongoose.models.HomeContent || mongoose.model('HomeContent', HomeContentSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  await HomeContent.findOneAndUpdate(
    {},
    { factoryVideoUrl: "https://www.youtube.com/watch?v=XkcgISZRmsA&list=RDXkcgISZRmsA&start_radio=1" },
    { upsert: true }
  );
  console.log("Updated HomeContent successfully!");
  process.exit(0);
}
run();
