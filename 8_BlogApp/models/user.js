import { Schema } from 'mongoose';

// creating a schema for user model
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String
    },
}, { timestamps: true });

export default userSchema;
