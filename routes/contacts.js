const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('contacts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    // Format JSON with indentation
    res.status(200).json(lists, null, 2);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection('contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const contact = req.body;

    if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await mongodb
      .getDb()
      .collection('contacts')
      .insertOne(contact);
    
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;