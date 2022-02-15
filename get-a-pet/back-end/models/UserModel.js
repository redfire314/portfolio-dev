// Dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;

// User schema
const schema = {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    zipCode: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
};

const User = mongoose.model('User', new Schema(schema, { timestamps: true }));

// Export
module.exports = User;
