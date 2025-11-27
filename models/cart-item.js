const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = CartItem;
