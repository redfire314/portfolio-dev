// Dependencies
const mongoose = require('mongoose');

async function connect() {
    const host = process.env.MONGODB_HOST;
    const port = process.env.MONGODB_PORT;
    const db = process.env.MONGODB_DB;

    console.log('Trying to connect to MongoDB with Mongoose..');
    await mongoose.connect(`mongodb://${host}:${port}/${db}`);
}

// Export
module.exports = connect;
