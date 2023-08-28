const reader = require('../csv-reader');
const moment = require('moment');
const Sleep = require('../models/sleepModel');

const calculateHoursInBed = (durationInBed) => {
    const [startTime, endTime] = durationInBed.split(' - ');

    const start = moment(startTime, 'hh:mma');
    const end = moment(endTime, 'hh:mma');

    let duration = moment.duration(end.diff(start)).asHours();

    if (duration < 0) {
        duration += 24;
    }
    // return in hh:mm format
    return moment.utc(duration * 60 * 60 * 1000).format('HH:mm:ss');
};

const sleepDataImport = async (req, res) => {
    try {
        const data = await reader('src/static/sleep_data.csv');
        const filteredSleepData = data.map((item) => {
            const newItem = {
                user: item['USER'],
                day: item['DAY'],
                date: moment(item['DATE'], 'MM/DD/YY').utc().format(),
                sleepScore: item['SLEEP SCORE'],
                hoursOfSleep: item['HOURS OF SLEEP'],
                remSleep: item['REM SLEEP'],
                deepSleep: item['DEEP SLEEP'],
                heartRateBelowResting: item['HEART RATE BELOW RESTING'],
                durationInBed: item['DURATION IN BED'],
                hoursInBed: calculateHoursInBed(item['DURATION IN BED']),
            };

            return newItem;
        });
        const sleep = await Sleep.insertMany(filteredSleepData);

        res.status(201).json(sleep);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { sleepDataImport };
