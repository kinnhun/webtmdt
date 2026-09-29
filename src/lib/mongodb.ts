import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dht_furniture";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
  // eslint-disable-next-line no-var
  var _mongooseEventsBound: boolean | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// Bind connection events once to auto-reset cache on socket drop/disconnect
if (!global._mongooseEventsBound) {
  global._mongooseEventsBound = true;

  mongoose.connection.on("disconnected", () => {
    cached.conn = null;
    cached.promise = null;
  });

  mongoose.connection.on("error", (err) => {
    console.error("[MongoDB] Connection error:", err.message);
    cached.conn = null;
    cached.promise = null;
  });
}

async function dbConnect(): Promise<typeof mongoose> {
  // 1. If connection is already open and ready (readyState === 1), reuse it
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  // 2. If a connection is actively being established (readyState === 2), wait for it
  if (cached.promise && mongoose.connection.readyState === 2) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch {
      cached.promise = null;
      cached.conn = null;
    }
  }

  // 3. Clear any stale connection reference
  cached.conn = null;
  cached.promise = null;

  // 4. Establish fresh connection with resilient keep-alive & auto-reconnect settings
  const options: mongoose.ConnectOptions = {
    maxPoolSize: 10,
    minPoolSize: 0,
    maxIdleTimeMS: 20000, // Recycle idle sockets before remote firewall kills them with ECONNRESET
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 8000,
    socketTimeoutMS: 25000,
    heartbeatFrequencyMS: 10000,
    retryWrites: true,
    retryReads: true,
  };

  cached.promise = mongoose
    .connect(MONGODB_URI, options)
    .then((m) => {
      cached.conn = m;
      return m;
    })
    .catch((err) => {
      cached.promise = null;
      cached.conn = null;
      throw err;
    });

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
