const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, required: true }
}, { timeStamps: true });

const dealsSchema = new mongoose.Schema({
    available: { type: Boolean, required: true },
    discount: { type: Number, required: true }
});

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    department: { type: String, required: true },
    category: { type: String, required: true },
    features: { type: Array },
    deals: [dealsSchema],
    countInStock: { type: Number, required: true },
    reviews: [reviewSchema],
}, { timeStamps: true });

module.exports = mongoose.model('products', productSchema);