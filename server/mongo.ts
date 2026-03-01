import mongoose from "mongoose";

let connectPromise: Promise<typeof mongoose> | null = null;

export async function connectMongo(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI must be set");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(uri);
  }

  try {
    await connectPromise;
    return mongoose;
  } catch (error) {
    connectPromise = null;
    throw error;
  }
}
