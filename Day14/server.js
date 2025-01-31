// Importing required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Creating an Express server
const server = express();
server.use(cors());
server.use(express.json()); // Middleware to parse JSON

// Assigning a port number
const port = process.env.PORT || 6000;

// MongoDB Connection
const mongo_uri = process.env.MONGO_URI;

mongoose.connect(mongo_uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Creating a schema for the database
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

// Creating a Mongoose model
const Item = mongoose.model('Item', itemSchema);

// Routes
server.get('/', (req, res) => {
  res.send("Server is running");
});

// Fetch all products
server.get('/product', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Add a new product
server.post('/product', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error saving product', error });
  }
});

// Update a product by ID
server.put('/product/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    updatedItem
      ? res.json(updatedItem)
      : res.status(404).json({ message: 'Item not found' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
});

// Delete a product by ID
server.delete('/product/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    deletedItem
      ? res.json(deletedItem)
      : res.status(404).json({ message: 'Item not found' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error });
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
