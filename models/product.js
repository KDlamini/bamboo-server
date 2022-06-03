const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, required: true }
}, { timeStamps: true });

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    countInStock: { type: Number, required: true },
    reviews: [reviewSchema],
}, { timeStamps: true });

module.exports = mongoose.model('products', productSchema);