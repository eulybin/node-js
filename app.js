const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();

const initDatabase = require('./config/init');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/404');
const adminMiddleware = require('./middleware/admin');

// set up view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse form data to be accessible in req.body
app.use(express.urlencoded({ extended: false }));
// give express access to static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// pass Admin into all controllers
app.use(adminMiddleware);

//set up routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404 page placed as the last middleware
app.use(errorController.get404);

// set up db with sequelize and start server
initDatabase(app, process.env.PORT);
