const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = async (req, res, next) => {
    const admin = req.admin;
    try {
        await admin.createProduct({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            description: req.body.description,
        });
        res.redirect('/products');
    } catch (err) {
        console.error('ERROR from postAddProduct', err);
    }
};

exports.getEditProduct = async (req, res, next) => {
    const productId = req.params.id;
    const admin = req.admin;
    try {
        const products = await admin.getProducts({ where: { id: productId } });
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
    const admin = req.admin;
    try {
        const cart = await admin.getCart();
        const product = await Product.findByPk(productId);
        await cart.removeProduct(product);
        await product.destroy();
        res.redirect('/admin/products');
    } catch (err) {
        console.error('ERROR from deleteProduct admin controller', err);
    }
};

exports.getProducts = async (req, res, next) => {
    const admin = req.admin;
    try {
        const products = await admin.getProducts();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    } catch (err) {
        console.error('ERROR from getProducts admin controller', err);
    }
};
