const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

    message: {
        type: String,
        required: true,
    }
});