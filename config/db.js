const Admin = require('../models/admin');
const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');

// DB Table Relationships
Admin.hasMany(Product);
Product.belongsTo(Admin, { constraints: true, onDelete: 'CASCADE' });

Admin.hasOne(Cart);
Cart.belongsTo(Admin, { constraints: true, onDelete: 'CASCADE' });

Admin.hasMany(Order);
Order.belongsTo(Admin, { constraints: true, onDelete: 'CASCADE' });

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = { Product, Admin, Cart, CartItem, Order, OrderItem };
