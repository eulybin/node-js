const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Product;
