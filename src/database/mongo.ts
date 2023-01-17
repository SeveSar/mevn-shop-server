import mongoose from "mongoose";

const DB_URL = process.env.DB_URL ?? "";

const options = {
  dbName: `pizza-db`,
};
const connectToMongoDB = async () => {
  mongoose.set("strictQuery", false);
  return await mongoose.connect(DB_URL, options);
};

export { connectToMongoDB };
