import { MongoClient } from 'mongodb';

const MONGO_URL = "mongodb+srv://backend_user:backend_password@seng-db.lfnofmf.mongodb.net/seng";

export const getDb = async () => {
  const client: any = await MongoClient.connect(MONGO_URL);
  return client.db();
};