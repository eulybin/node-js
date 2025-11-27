const path = require('path');

const express = require('express');
const app = express();

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// import database
const sequelize = require('./utils/database');

// set up view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse form data to be accessible in req.body
app.use(express.urlencoded({ extended: false }));
// give express access to static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

//set up routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404 page
app.use(errorController.get404);

// set up db with sequelize and start server
sequelize
    .sync()
    .then(() => {
        app.listen(5006);
    })
    .catch((err) => {
        console.error('ERROR syncing database:', err);
    });
