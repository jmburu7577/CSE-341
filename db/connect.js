const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;

dotenv.config();

// Only log non-sensitive information
if (process.env.ENABLE_DB_LOGGING === 'true') {
  console.log('Attempting to connect to MongoDB...');
} 

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db('contacts');
      console.log('Successfully connected to MongoDB.');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};