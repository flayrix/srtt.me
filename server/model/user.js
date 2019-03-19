const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isBanned: {
        type: Boolean,
        required: true,
        default: false
    },
    subscription: {
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        plan: {
            type: Number,
            required: true,
            default: 1
        }
    }
});


module.exports = mongoose.model('user', userSchema);