const express = require('express')
const router = express-router();
const Product = require('../models/product')

router.get('/', async (Req, res) => {
    const products = await Product.find().sort({ createdAt: -1    });
    res.json(products);
})

router.post('/', async (Req, res) => {
    const newProduct = new Product({
        name: Req.body.text
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
});

router.put('/:id', async (Req, res) => {
const product = await Product.findByid(req.params.id);
product.completed= !product.completed;
await product.save();
res.json(product);
});
router.delete('/:id', async (Req, res) => {
   const deletedProduct = await Product.findByidAndDelete(req.params.id);
   res.json({message: 'Product deleted', id:deletedProduct.id}) 
});
module.exports = router;