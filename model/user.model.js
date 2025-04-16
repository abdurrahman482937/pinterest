const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/pinterest')

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    dp: {
        type: String,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    ],
}, { timestamps: true });

userSchema.plugin(plm)
module.exports = mongoose.model('User', userSchema);
