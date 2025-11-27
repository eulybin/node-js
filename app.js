const path = require('path');

const express = require('express');
const app = express();

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// import database
const sequelize = require('./utils/database');

// import models
const Product = require('./models/product');
const Admin = require('./models/admin');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// set up view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse form data to be accessible in req.body
app.use(express.urlencoded({ extended: false }));
// give express access to static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// pass Admin into all controllers
app.use(async (req, res, next) => {
    try {
        const admin = await Admin.findByPk(1);
        req.admin = admin;
        next();
    } catch (err) {
        console.error('ERROR from admin set up middleware in app.js', err);
    }
});

//set up routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404 page
app.use(errorController.get404);

// set up models relationships
Admin.hasMany(Product);
Product.belongsTo(Admin, { constraints: true, onDelete: 'CASCADE' });

Admin.hasOne(Cart);
Cart.belongsTo(Admin, { constraints: true, onDelete: 'CASCADE' });

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Admin.hasMany(Order);
Order.belongsTo(Admin, { constraints: true, onDelete: 'CASCADE' });

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// set up db with sequelize and start server
sequelize
    .sync()
    .then(() => {
        return Admin.findByPk(1);
    })
    .then((admin) => {
        if (!admin) {
            return Admin.create({
                name: 'Egor',
                email: 'egor@test.com',
            });
        }
        return admin;
    })
    .then((admin) => {
        return admin.createCart();
    })
    .then(() => {
        app.listen(5006);
    })
    .catch((err) => {
        console.error('ERROR syncing database:', err);
    });
