const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI || '';
let client = null;
let db = null;

async function connectToMongo() {
    if (!uri) return null;
    if (client && db) return db;
    client = new MongoClient(uri, { connectTimeoutMS: 10000 });
    await client.connect();
    db = client.db(process.env.MONGODB_DBNAME || 'contactsdb');
    return db;
}

function getDb() {
    return db;
}

function getCollection(name = process.env.MONGODB_COLLECTION || 'contacts') {
    if (!db) throw new Error('Database not initialized. Call connectToMongo first.');
    return db.collection(name);
}

module.exports = {
    connectToMongo,
    getDb,
    getCollection,
    client: () => client
};
