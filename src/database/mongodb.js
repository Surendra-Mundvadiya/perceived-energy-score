require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.ODB_URI;

const opt = {
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
};
mongoose.set('strictQuery', true);
mongoose
    .connect(URI, opt)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log('MongoDB Connection Error', err);
    });

mongoose.pluralize(null);
module.exports = mongoose;
