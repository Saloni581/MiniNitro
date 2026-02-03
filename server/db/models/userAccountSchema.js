import mongoose from 'mongoose';

const UserAccountSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    password: { type: String, required: true },
}, { timestamps : true });

export default mongoose.model('UserAccount', UserAccountSchema);