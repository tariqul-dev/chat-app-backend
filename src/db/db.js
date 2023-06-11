const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Connected to database`);
    } catch (error) {
        console.log(`Connection did not stablished`);
    }
}

module.exports = connection;