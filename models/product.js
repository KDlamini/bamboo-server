const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timeStamps: true });

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
    deals: { type: Object, default: {
        available: false,
        discount: 0,
        deal_type: '',
    }},
    countInStock: { type: Number, required: true },
    reviews: [reviewSchema],
}, { timeStamps: true });

module.exports = mongoose.model('products', productSchema);