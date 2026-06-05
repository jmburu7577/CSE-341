const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const sampleContacts = require('./sample-contacts.json');

dotenv.config();

async function insertSampleData() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db();
    const result = await db.collection('contacts').insertMany(sampleContacts);
    console.log(`${result.insertedCount} contacts inserted successfully!`);
  } finally {
    await client.close();
  }
}

insertSampleData().catch(console.error);
