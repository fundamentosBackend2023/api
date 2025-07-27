const express = require('express');
const mainRouter = express.Router();
const clientRouter = require('./clientRoutes');
const orderRouter = require('./orderRouter');

function linkRouters(app){
    app.use('/api/v1', mainRouter);
    mainRouter.use('/clients', clientRouter);
    mainRouter.use('/orders', orderRouter);
}

module.exports = linkRouters;