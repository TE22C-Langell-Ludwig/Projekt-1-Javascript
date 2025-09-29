import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      AddedAt: req.body.AddedAt || Date.now()
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add product' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.completed = !product.completed;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

    res.json({ message: 'Product deleted', id: deletedProduct._id });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

export default router;