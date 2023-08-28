const User = require('../models/userModel');
const Sleep = require('../models/sleepModel');
const Activity = require('../models/activityModel');
const Mood = require('../models/moodModel');
const { default: mongoose } = require('mongoose');

const usersData = [
    {
        name: 'User A',
        timezone: 'Americas/Los Angeles',
        version: 70,
        app: 'Wysa',
        country: 'US',
        createdAt: new Date('2021-11-18T15:56:11.553Z'),
        updatedAt: new Date('2021-11-18T15:56:46.392Z'),
    },
    {
        name: 'User B',
        timezone: 'Europe/London',
        version: 80,
        app: 'Wysa',
        country: 'UK',
        createdAt: new Date('2021-11-19T10:15:00.000Z'),
        updatedAt: new Date('2021-11-19T10:45:00.000Z'),
    },
];
// Register a new user
const registerUser = async (req, res) => {
    try {
        const user = await User.insertMany(usersData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserByAggregation = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ error: 'Invalid user id' });
        }
        if (!req.query.date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        const user = new mongoose.Types.ObjectId(req.params.userId);
        const startDate = new Date(req.query.date);
        const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
        const pipeline = [
            {
                $match: {
                    _id: user,
                },
            },
            {
                $lookup: {
                    from: 'Mood',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'mood',
                },
            },
            {
                $unwind: {
                    path: '$mood',
                },
            },
            {
                $project: {
                    user: '$_id',
                    mood_score: '$mood.value',
                    _id: 0,
                },
            },
            {
                $lookup: {
                    from: 'Sleep',
                    localField: 'user',
                    foreignField: 'user',
                    pipeline: [
                        {
                            $match: {
                                date: {
                                    $gte: startDate,
                                    $lt: endDate,
                                },
                            },
                        },
                    ],
                    as: 'sleep',
                },
            },
            {
                $unwind: {
                    path: '$sleep',
                },
            },
            {
                $project: {
                    user: 1,
                    mood_score: 1,
                    'sleep.sleepScore': 1,
                    'sleep.hoursOfSleep': 1,
                    'sleep.hoursInBed': 1,
                },
            },
            {
                $lookup: {
                    from: 'Activity',
                    localField: 'user',
                    foreignField: 'user',
                    pipeline: [
                        {
                            $match: {
                                date: {
                                    $gte: startDate,
                                    $lt: endDate,
                                },
                            },
                        },
                    ],
                    as: 'activity',
                },
            },

            {
                $project: {
                    user: 1,
                    mood_score: 1,
                    'sleep.sleepScore': 1,
                    'sleep.hoursOfSleep': 1,
                    'sleep.hoursInBed': 1,
                    'activity.duration': 1,
                    'activity.distance': 1,
                    'activity.steps': 1,
                    'activity.activity': 1,
                },
            },
        ];
        const userData = await User.aggregate(pipeline);
        res.status(200).json(userData[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserBySplitQuery = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ error: 'Invalid user id' });
        }
        if (!req.query.date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        const user = new mongoose.Types.ObjectId(req.params.userId);
        const startDate = new Date(req.query.date);
        const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

        const [moodData, sleepData, activityData] = await Promise.all([
            Mood.findOne({ user }, { value: 1, _id: 0 }),
            Sleep.findOne({ user, date: { $gte: startDate, $lt: endDate } }, { sleepScore: 1, hoursOfSleep: 1, hoursInBed: 1, _id: 0 }),
            Activity.find({ user, date: { $gte: startDate, $lt: endDate } }, { duration: 1, distance: 1, steps: 1, activity: 1, _id: 0 }),
        ]);

        const userData = {
            user,
            mood_score: moodData.value,
            sleep: sleepData,
            activity: activityData,
        };
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, getUserByAggregation, getUserBySplitQuery };
