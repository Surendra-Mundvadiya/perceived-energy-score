const mongoose = require('../database/mongodb');

const sleepSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    day: { type: String, required: true },
    date: { type: Date, required: true },
    sleepScore: { type: Number, required: true },
    hoursOfSleep: { type: String, required: true },
    remSleep: { type: String, required: true },
    deepSleep: { type: String, required: true },
    heartRateBelowResting: { type: String, required: true },
    durationInBed: { type: String, required: true },
    hoursInBed: { type: String, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
