const mongoose = require('../database/mongodb');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timezone: { type: String, required: true },
    version: { type: Number, required: true },
    app: { type: String, required: true },
    country: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
