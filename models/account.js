const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    posts: [],
});

const account = mongoose.model('Account', accountSchema)

module.exports = account;