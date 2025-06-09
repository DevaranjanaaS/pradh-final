const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const Subcategory = require('../../models/Subcategory');

// Get all categories and subcategories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  const subcategories = await Subcategory.find();
  res.json({
    categories: categories.map(c => c.toJSON()),
    subcategories: subcategories.map(s => s.toJSON())
  });
});

// Add category
router.post('/', async (req, res) => {
  const { name } = req.body;
  const cat = new Category({ name });
  await cat.save();
  res.json({ id: cat._id, name: cat.name });
});

// Update category
router.put('/:id', async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
  res.sendStatus(200);
});

// Delete category and its subcategories
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  await Subcategory.deleteMany({ categoryId: req.params.id });
  res.sendStatus(200);
});

module.exports = router;
