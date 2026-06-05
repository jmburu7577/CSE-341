require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('MONGODB_URI not set in environment');
    process.exit(1);
}

async function seed() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(process.env.MONGODB_DBNAME || 'contactsdb');
        const col = db.collection(process.env.MONGODB_COLLECTION || 'contacts');

        const docs = [
            {
                firstName: 'Alice',
                lastName: 'Johnson',
                email: 'alice.johnson@example.com',
                favoriteColor: 'blue',
                birthday: '1990-05-15'
            },
            {
                firstName: 'Bob',
                lastName: 'Smith',
                email: 'bob.smith@example.com',
                favoriteColor: 'green',
                birthday: '1985-11-02'
            },
            {
                firstName: 'Carol',
                lastName: 'Davis',
                email: 'carol.davis@example.com',
                favoriteColor: 'red',
                birthday: '1992-08-30'
            },
            {
                firstName: 'David',
                lastName: 'Nguyen',
                email: 'david.nguyen@example.com',
                favoriteColor: 'orange',
                birthday: '1988-04-12'
            },
            {
                firstName: 'Emily',
                lastName: 'Martinez',
                email: 'emily.martinez@example.com',
                favoriteColor: 'purple',
                birthday: '1993-09-21'
            }
        ];

        const result = await col.insertMany(docs);
        console.log('Inserted documents:', result.insertedCount);
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        await client.close();
    }
}

seed();
