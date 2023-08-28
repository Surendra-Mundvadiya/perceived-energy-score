const fs = require('fs');
const csv = require('csv-parser');

const extraction = (path) => {
    const results = [];
    return new Promise((resolve, reject) => {
        // Open the file stream
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (err) => {
                reject(err);
            });

    });
};

module.exports = extraction;
