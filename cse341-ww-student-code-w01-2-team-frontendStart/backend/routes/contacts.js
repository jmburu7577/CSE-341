const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const db = require('../db/conn');

// GET /api/contacts - return all contacts
router.get('/', async (req, res) => {
    try {
        const database = await db.connectToMongo();
        if (!database) return res.status(500).json({ error: 'Database not configured' });
        const collection = db.getCollection();
        const docs = await collection.find({}).toArray();
        res.json(docs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// GET /api/contacts/:id - return single contact by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
        const database = await db.connectToMongo();
        if (!database) return res.status(500).json({ error: 'Database not configured' });
        const collection = db.getCollection();
        const doc = await collection.findOne({ _id: new ObjectId(id) });
        if (!doc) return res.status(404).json({ error: 'Contact not found' });
        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch contact' });
    }
});

// POST /api/contacts - create a new contact
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: 'firstName, lastName, email, favoriteColor, and birthday are required' });
        }
        const database = await db.connectToMongo();
        if (!database) return res.status(500).json({ error: 'Database not configured' });
        const collection = db.getCollection();
        const result = await collection.insertOne({ firstName, lastName, email, favoriteColor, birthday });
        res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

// PUT /api/contacts/:id - update a contact
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        const updates = {};
        if (firstName !== undefined) updates.firstName = firstName;
        if (lastName !== undefined) updates.lastName = lastName;
        if (email !== undefined) updates.email = email;
        if (favoriteColor !== undefined) updates.favoriteColor = favoriteColor;
        if (birthday !== undefined) updates.birthday = birthday;
        if (Object.keys(updates).length === 0) return res.status(400).json({ error: 'No fields to update' });

        const database = await db.connectToMongo();
        if (!database) return res.status(500).json({ error: 'Database not configured' });
        const collection = db.getCollection();
        const result = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updates }, { returnDocument: 'after' });
        if (!result.value) return res.status(404).json({ error: 'Contact not found' });
        res.json(result.value);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

// DELETE /api/contacts/:id - delete a contact
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });
        const database = await db.connectToMongo();
        if (!database) return res.status(500).json({ error: 'Database not configured' });
        const collection = db.getCollection();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: 'Contact not found' });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

module.exports = router;
