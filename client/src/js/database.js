import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function in order to use PUT to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  // create a transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open object store jate
  const store = tx.objectStore('jate');
  // Using put method to assign id and content
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data saved to the database', result.value);
};

// Export a function in order to use GET to the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('data retrieved from database', result.value)
    : console.log('data not found in database');
  return result?.value;
};

initdb();
