const express = require('express');
const router = express.Router();
const OrderServices = require('../services/orderServices');

router.get('/', (req, res) => {
    const orders = OrderServices.getAll();
    res.status(200).json({
        message: 'Orders list',
        orders: orders
    });
});

router.post('/', (req, res) => {
    const receivedOrder = req.body;
    OrderServices.create(receivedOrder)
    res.status(201).json({
        message: 'order successfully registered'
    });
});

module.exports = router;