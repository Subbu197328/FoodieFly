const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true   // Ensures email is unique
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now  // ✅ Fixed - Should be a function reference, not a direct call
    }
});

module.exports = mongoose.model('user', UserSchema);
