const path = require('path');

const express = require('express');
const app = express();

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

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

// localhost
app.listen(5006);
