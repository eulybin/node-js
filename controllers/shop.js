/** @type {import('sequelize').ModelStatic<any>} */

const Cart = require('../models/cart');
const Product = require('../models/product');

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
    const admin = req.admin;
    try {
        const cart = await admin.getCart();
        const cartItems = await cart.getProducts();
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            items: cartItems,
        });
    } catch (err) {
        console.error('ERROR from getCart shop controller', err);
    }
};

exports.postCart = async (req, res, next) => {
    const productId = req.body.productId;
    const admin = req.admin;
    try {
        const cart = await admin.getCart();
        const products = await cart.getProducts({ where: { id: productId } });
        let product;

        if (products.length > 0) {
            product = products[0];
            const oldQuantity = product.CartItem.quantity;
            await product.CartItem.update({ quantity: oldQuantity + 1 });
        } else {
            product = await Product.findByPk(productId);
            await cart.addProduct(product, { through: { quantity: 1 } });
        }

        res.redirect('/cart');
    } catch (err) {
        console.error('ERROR from postCart in shop controller', err);
    }
};

exports.deleteCartItem = async (req, res, next) => {
    const itemId = req.body.itemId;
    const admin = req.admin;
    try {
        const cart = await admin.getCart();
        const products = await cart.getProducts({ where: { id: itemId } });
        if (products.length > 0) {
            await products[0].CartItem.destroy();
        }
        res.redirect('/cart');
    } catch (err) {
        console.error('ERROR from deleteCartItem in shop controllers', err);
    }
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
