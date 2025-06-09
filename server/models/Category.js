const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

CategorySchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject();
  object.id = _id.toString();
  return object;
});

module.exports = mongoose.model('Category', CategorySchema);
