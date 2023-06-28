import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL ?? '';

const options = {
  dbName: process.env.MONGO_DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set('strictQuery', false);

const connectToMongoDB = async () => {
  mongoose.set('strictQuery', false);

  const m = await mongoose.connect(DB_URL, options);
  return m.connection.getClient();
};

export { connectToMongoDB };
