const express = require('express');
const router = express.Router();
const Subcategory = require('../../models/Subcategory');

// Add subcategory
router.post('/', async (req, res) => {
  const { name, categoryId } = req.body;
  const sub = new Subcategory({ name, categoryId });
  await sub.save();
  res.json(sub.toJSON());
});

// Update subcategory
router.put('/:id', async (req, res) => {
  await Subcategory.findByIdAndUpdate(req.params.id, { name: req.body.name });
  res.sendStatus(200);
});

// Delete subcategory
router.delete('/:id', async (req, res) => {
  await Subcategory.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
