import mongoose from 'mongoose';
import { createHmac, randomBytes } from 'crypto';
import { createTokenForUser } from '../services/authentication.js';

const { Schema } = mongoose;

// creating a schema for the user model
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
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '../public/images/images.png'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true });


// hashing the password using crypto
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;

    // generating salt
    const salt = randomBytes(16).toString();

    // hashing the password
    const hashedPass = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    this.salt = salt;
    this.password = hashedPass;

    next();
});


// creating a virtual function to check if the password is correct

userSchema.static('matchPasswordAndGenrateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPass = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (hashedPass !== userProvidedHash) throw new Error('Invalid password');

    // return { ...user, password: undefined, salt: undefined };
    // create token for the user
    const token = createTokenForUser(user);
    return token;

})


// creating a model for the user schema
const User = mongoose.model('User', userSchema);

export default User;
