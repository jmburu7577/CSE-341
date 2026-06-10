const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

const validateRequiredFields = (body) => {
  for (const f of REQUIRED_FIELDS) {
    if (body[f] === undefined || body[f] === null || body[f] === '') return false;
  }
  return true;
};

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to find a contact.');
  }

  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    if (!lists[0]) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const body = req.body || {};

  if (!validateRequiredFields(body)) {
    return res.status(400).json({ error: 'firstName, lastName, email, favoriteColor, and birthday are required' });
  }

  const collection = mongodb.getDb().db().collection('contacts');
  const result = await collection.insertOne({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    favoriteColor: body.favoriteColor,
    birthday: body.birthday,
  });

  res.status(201).json({ insertedId: result.insertedId.toString() });
};

const updateContact = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Must use a valid contact id to update a contact.' });
  }

  const updates = {};
  const body = req.body || {};
  for (const f of REQUIRED_FIELDS) {
    if (body[f] !== undefined) updates[f] = body[f];
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No fields provided to update.' });
  }

  const collection = mongodb.getDb().db().collection('contacts');

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updates },
    { returnDocument: 'after' }
  );

  if (!result || !result.value) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  // Rubric: return an http status code representing successful completion
  return res.sendStatus(200);
};

const deleteContact = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Must use a valid contact id to delete a contact.' });
  }

  const collection = mongodb.getDb().db().collection('contacts');

  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  return res.sendStatus(204);
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};

