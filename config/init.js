const sequelize = require('../utils/database');
const { Admin } = require('./db');

const { DEFAULT_ADMIN_ID } = require('../utils/constants');

const initDatabase = async (app, port) => {
    try {
        await sequelize.sync();
        let admin = await Admin.findByPk(DEFAULT_ADMIN_ID);
        if (!admin) {
            admin = await Admin.create({ name: 'Egor', email: 'egor@test.com' });
        }
        await admin.createCart();
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error('ERROR initializing database:', err);
    }
};

module.exports = initDatabase;
