const express = require('express');
const router = express.Router();
const Product = require('../schema/product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    // console.log(products[0].title)
    // res.status(200).json({msg:'sucess'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one product by ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// POST a new product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// ADD MANY PRODUCTS
router.post('/bulk', async (req, res) => {
    const products = req.body; // Assuming req.body is an array of products
  
    try {
      const newProducts = await Product.insertMany(products);
      res.status(201).json(newProducts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
// PUT (update) a product by ID
router.put('/:id', getProduct, async (req, res) => {
  try {
    const updatedProduct = await res.product.set(req.body).save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product by ID
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}

module.exports = router;
