const path = require('path');

const express = require('express');
const app = express();

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// import database
const sequelize = require('./utils/database');

// import models
/** @type {import('sequelize').ModelStatic<any>} */
const Product = require('./models/product');
/** @type {import('sequelize').ModelStatic<any>} */
const User = require('./models/user');

// set up view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse form data to be accessible in req.body
app.use(express.urlencoded({ extended: false }));
// give express access to static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// pass User into all controllers
app.use(async (req, res, next) => {
    try {
        const user = await User.findByPk(1);
        req.user = user;
        next();
    } catch (err) {
        console.error('ERROR from user set up middleware in app.js', err);
    }
});

//set up routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404 page
app.use(errorController.get404);

// set up models relationships
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

// set up db with sequelize and start server
sequelize
    .sync()
    .then(() => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({
                name: 'Egor',
                email: 'egor@test.com',
            });
        }
        return user;
    })
    .then(() => {
        app.listen(5006);
    })
    .catch((err) => {
        console.error('ERROR syncing database:', err);
    });
