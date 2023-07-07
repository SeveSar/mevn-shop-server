import mongoose from 'mongoose';
import { get as getEnv } from 'env-var';
const DB_URL = getEnv('DB_URL').required().asString();
const dbName = getEnv('MONGO_DB_NAME').required().asString();
const options = {
  dbName,
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
