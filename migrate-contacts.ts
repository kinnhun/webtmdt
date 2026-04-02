import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("MONGODB_URI missing!");
  process.exit(1);
}

const ContactSchema = new mongoose.Schema({
  status: String,
  category: String,
}, { strict: false });

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

async function migrate() {
  await mongoose.connect(MONGO_URI!);
  console.log("Connected to DB...");

  // Update categories where missing
  const resCat = await Contact.updateMany(
    { category: { $exists: false } },
    { $set: { category: "other" } }
  );
  console.log(`Updated categories: ${resCat.modifiedCount}`);

  // Status mapping
  const resNew = await Contact.updateMany({ status: "new" }, { $set: { status: "pending" } });
  console.log(`new -> pending: ${resNew.modifiedCount}`);

  const resReplied = await Contact.updateMany({ status: "replied" }, { $set: { status: "processing" } });
  console.log(`replied -> processing: ${resReplied.modifiedCount}`);

  const resQuoted = await Contact.updateMany({ status: "quoted" }, { $set: { status: "processing" } });
  console.log(`quoted -> processing: ${resQuoted.modifiedCount}`);

  const resClosed = await Contact.updateMany({ status: "closed" }, { $set: { status: "resolved" } });
  console.log(`closed -> resolved: ${resClosed.modifiedCount}`);

  console.log("Migration complete!");
  process.exit(0);
}

migrate();
