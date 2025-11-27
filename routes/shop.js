const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/products', shopController.getProducts);

router.get('/products/:id', shopController.getProductDetails);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.deleteCartItem);

router.post('/create-order', shopController.postCreateOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;
