const express = require('express');
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const router = express.Router();

// Route to get all items
router.get('/items', getItems);

// Route to create a new item
router.post('/items', createItem);

// Route to update an item by id
router.put('/items/:id', updateItem);

// Route to delete an item by id
router.delete('/items/:id', deleteItem);

module.exports = router;
