const Item = require('../models/item');
var admin = require('firebase-admin');

// Load the service account JSON file
var serviceAccount = require('../config/boo.json');

// Initialize the app with the service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gladiator-875f1.appspot.com'
});
const bucket = admin.storage().bucket();
const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    blobStream.on('error', (error) => reject(error));
    blobStream.on('finish', async () => {
      // Make the file public
      await blob.makePublic();

      // Resolve with the public URL
      resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    });

    blobStream.end(file.buffer);
  });
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createItem = async (req, res) => {
  const { name, price,cost, stock, category } = req.body;
  console.log("ya er", req.body)
  try {
    let imageUrl = '';
    if (req.file) {
        imageUrl = await uploadImage(req.file);
    }

    const newItem = new Item({ name, price, cost, stock, category, image: imageUrl });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
