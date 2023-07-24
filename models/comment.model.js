const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Comment', CommentSchema);