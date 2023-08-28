const Mood = require('../models/moodModel');
const moodData = [
    {
        moodId: 'ds1',
        field: 'mood_score',
        user: '64ec9feb4c05112928d8ad16', // Reference to the user with _id 'A'
        value: 8,
        createdAt: new Date('2021-11-18T11:24:25.466Z'),
        updatedAt: new Date('2021-11-18T11:24:25.466Z'),
    },
    {
        moodId: 'ds2',
        field: 'mood_score',
        user: '64ec9feb4c05112928d8ad17', // Reference to the user with _id 'B'
        value: 7,
        createdAt: new Date('2021-11-19T09:15:00.000Z'),
        updatedAt: new Date('2021-11-19T09:15:00.000Z'),
    },
];

const addMoodData = async (req, res) => {
    try {
        const mood = await Mood.insertMany(moodData);
        res.status(201).json(mood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addMoodData };
