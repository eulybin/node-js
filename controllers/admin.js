/** @type {import('sequelize').ModelStatic<any>} */

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = async (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    try {
        await Product.create({
            title,
            imageUrl,
            price,
            description,
        });
        res.redirect('/');
    } catch (err) {
        console.error('ERROR from postAddProduct', err);
    }
};

exports.getEditProduct = async (req, res, next) => {
    const productId = req.params.id;
    const targetProduct = await Product.fetchProductById(productId);
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: targetProduct,
        editing: true,
    });
};

exports.postEditProduct = async (req, res, next) => {
    const product = new Product(
        req.body.productId,
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price
    );
    await product.update();

    res.redirect('/admin/products');
};

exports.deleteProduct = async (req, res, next) => {
    const productId = req.body.productId;
    await Product.deleteById(productId);
    await Cart.removeFromCart(productId);
    res.redirect('/admin/products');
};

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    } catch (err) {
        console.error('ERROR from getProducts admin controller', err);
    }
};
