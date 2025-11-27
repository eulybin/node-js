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
    const Admin = req.admin;
    try {
        await Admin.createProduct({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            description: req.body.description,
        });
        res.redirect('/');
    } catch (err) {
        console.error('ERROR from postAddProduct', err);
    }
};

exports.getEditProduct = async (req, res, next) => {
    const productId = req.params.id;
    const Admin = req.admin;
    try {
        const products = await Admin.getProducts({ where: { id: productId } });
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: products[0],
            editing: true,
        });
    } catch (err) {
        console.error('ERROR from getEditProduct admin controller', err);
    }
};

exports.postEditProduct = async (req, res, next) => {
    const productId = req.body.productId;
    try {
        await Product.update(
            {
                title: req.body.title,
                imageUrl: req.body.imageUrl,
                price: req.body.price,
                description: req.body.description,
            },
            {
                where: { id: productId },
            }
        );
        res.redirect('/admin/products');
    } catch (err) {
        console.error('ERROR from the postEditProduct admin controller', err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const productId = req.body.productId;
    try {
        await Product.destroy({ where: { id: productId } });
        res.redirect('/admin/products');
    } catch (err) {
        console.error('ERROR from deleteProduct admin controller', err);
    }

    // await Cart.removeFromCart(productId);
};

exports.getProducts = async (req, res, next) => {
    const Admin = req.admin;
    try {
        const products = await Admin.getProducts();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    } catch (err) {
        console.error('ERROR from getProducts admin controller', err);
    }
};
