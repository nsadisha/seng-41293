import { getDb } from '../migrations-utils/database.helprt';

const USER_COLLECTION = 'users';

export const up = async () => {
  const db = await getDb();
  const collection = db.collection(USER_COLLECTION);
  collection.insertOne({
   name: "Test User",
   email: "test@email.com",
   password: "password"
  })
  /*
      Code your update script here!
   */
};

export const down = async () => {
  const db = await getDb();
  db.dropCollection(USER_COLLECTION);
  /*
      Code you downgrade script here!
   */
};