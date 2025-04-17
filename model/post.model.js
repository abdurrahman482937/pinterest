const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    imageText: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
