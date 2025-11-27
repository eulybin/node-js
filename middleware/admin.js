const { Admin } = require('../config/db');
const { DEFAULT_ADMIN_ID } = require('../utils/constants');

module.exports = async (req, res, next) => {
    try {
        const admin = await Admin.findByPk(DEFAULT_ADMIN_ID);
        req.admin = admin;
        next();
    } catch (err) {
        console.error('ERROR from admin middleware:', err);
        next(err);
    }
};
