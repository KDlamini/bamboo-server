const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.BD_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
    console.log('MongoDB connection failed: ', err);
});

dbConnection.on('connected', () => {
    console.log('MongoDB connected!');
});

module.exports = mongoose;