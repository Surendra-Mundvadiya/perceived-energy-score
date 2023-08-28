const mongoose = require('../database/mongodb');

module.exports = function (req, res, next) {
    if (mongoose.connection.readyState === 1) {
        next();
    } else {
        return res.status(400).send({
            success: false,
            message: 'Mongo not running.',
        });
    }
};
