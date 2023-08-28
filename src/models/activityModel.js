const mongoose = require('../database/mongodb');

const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: String, required: true },
    activity: { type: String, required: true },
    logType: { type: String, required: true },
    steps: { type: Number, required: true },
    distance: { type: Number, required: true },
    elevationGain: { type: Number, required: true },
    calories: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
