const Order = require('../models/order');
const Item = require('../models/item');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.item').populate('cashier');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const { items, total, cashier } = req.body;
  try {
    const order = new Order({ items, total, cashier });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
