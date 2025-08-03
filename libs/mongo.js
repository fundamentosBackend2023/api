const mongoose = require('mongoose');
const config = require('../config/config');

const connectToMongo = async () => {
    await mongoose.connect(config.dbUrl);
    console.log('Connected successfully to mongo');
}

module.exports = connectToMongo;