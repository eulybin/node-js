const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Admin = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Admin;
