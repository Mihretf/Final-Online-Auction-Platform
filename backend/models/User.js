const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['bidder', 'seller', 'admin'],
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        bankStatement: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: "pending",
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);