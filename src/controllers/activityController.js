const reader = require('../csv-reader');
const moment = require('moment');

const Activity = require('../models/activityModel');

const calculateDuration = (startTime, endTime) => {
    const start = moment(startTime, 'hh:mma');
    const end = moment(endTime, 'hh:mma');

    let duration = moment.duration(end.diff(start)).asHours();

    if (duration < 0) {
        duration += 24;
    }
    // return in hh:mm format
    return moment.utc(duration * 60 * 60 * 1000).format('HH:mm:ss');
};

const activityDataImport = async (req, res) => {
    try {
        const data = await reader(`src/static/activity_data_csv.csv`);
        const filteredActivityData = data.map((item) => {
            const newItem = {
                user: item['User'],
                date: moment(item['Date'], 'MM/DD/YY').utc().format(),
                startTime: item['StartTime'],
                endTime: item['EndTime'],
                duration: calculateDuration(item['StartTime'], item['EndTime']),
                activity: item['Activity'],
                logType: item['LogType'],
                steps: item['Steps'],
                distance: item['Distance'],
                elevationGain: item['ElevationGain'],
                calories: item['Calories'],
            };

            return newItem;
        });
        const activity = await Activity.insertMany(filteredActivityData);

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { activityDataImport };
