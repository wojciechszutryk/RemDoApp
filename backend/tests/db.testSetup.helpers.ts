import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

let mongo: MongoMemoryServer | undefined = undefined;

export const setUpTestDB = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {});
};

export const dropTestDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

export const dropTestCollections = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
      await collection.dropIndexes();
    }
  }
};
