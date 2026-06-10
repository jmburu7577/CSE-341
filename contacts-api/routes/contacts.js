const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contactsController');

// GET all contacts
router.get('/', contactsController.getAll);

// GET contact by id
router.get('/:id', contactsController.getSingle);

// POST create contact
router.post('/', contactsController.createContact);

// PUT update contact
router.put('/:id', contactsController.updateContact);

// DELETE contact
router.delete('/:id', contactsController.deleteContact);

module.exports = router;

