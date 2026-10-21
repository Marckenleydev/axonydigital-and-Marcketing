import "server-only";

import mongoose from "mongoose";

type MongoCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // Reuse connections across Next.js hot reloads and serverless warm invocations.
  var __axonyMongoCache: MongoCache | undefined;
}

const cache = (globalThis.__axonyMongoCache ??= {
  connection: null,
  promise: null,
});

export async function connectMongo(): Promise<typeof mongoose> {
  if (cache.connection) return cache.connection;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required for CRM server operations.");

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10_000,
      })
      .then((connection) => connection)
      .catch((error: unknown) => {
        cache.promise = null;
        throw error;
      });
  }

  cache.connection = await cache.promise;
  return cache.connection;
}
