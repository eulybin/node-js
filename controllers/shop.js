/** @type {import('sequelize').ModelStatic<any>} */

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    } catch (err) {
        console.error('ERROR from the getIndex controller');
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    } catch (err) {
        console.error('ERROR from the getProducts controller');
    }
};

exports.getProductDetails = async (req, res, next) => {
    const productId = req.params.id;
    try {
        const targetProduct = await Product.findByPk(productId);
        res.render('shop/product-detail', {
            product: targetProduct,
            pageTitle: 'Details Page',
            path: `/products`,
        });
    } catch (err) {
        console.error('ERROR from the getProductDetails controller in shop', err);
    }
};

exports.getCart = async (req, res, next) => {
    const cartItems = await Cart.fetchAllCartItems();
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        items: cartItems,
    });
};

exports.postCart = async (req, res, next) => {
    const productId = req.body.productId;
    const productToAdd = await Product.fetchProductById(productId);
    await Cart.addToCart(productToAdd);
    res.redirect('/cart');
};

exports.deleteCartItem = async (req, res, next) => {
    const cartItemId = req.body.itemId;
    await Cart.removeFromCart(cartItemId);
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout',
    });
};
