const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
    });
};

exports.getProductDetails = async (req, res, next) => {
    const productId = req.params.id;
    const targetProduct = await Product.fetchProductById(productId);
    res.render('shop/product-detail', {
        product: targetProduct,
        pageTitle: 'Details Page',
        path: `/products`,
    });
};

exports.getIndex = async (req, res, next) => {
    const products = await Product.fetchAll();
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
    });
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
