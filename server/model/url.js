const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true
    },
    destUrl: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false,
        default: 'false'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUsedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isBanned: {
        type: Boolean,
        required: true,
        default: false
    },
    visit: [{
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        },
        browser: {
            type: String,
            required: true
        },
        os: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        source: {
            type: String,
            required: true
        },
    }]
});


module.exports = mongoose.model('url', userSchema);