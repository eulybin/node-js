// ----- RAW DB CONNECTION -----

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: '87vuxxcxd',
// });

// module.exports = pool.promise();

// ----- SEQUELIZE DB CONNECTION -----

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '87vuxxcxd', { host: 'localhost', dialect: 'mysql' });

module.exports = sequelize;
