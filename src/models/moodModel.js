const mongoose = require('../database/mongodb');

const moodSchema = new mongoose.Schema({
    field: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    value: { type: Number, min: 1, max: 10, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
