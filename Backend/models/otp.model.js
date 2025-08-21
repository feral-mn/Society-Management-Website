import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const otpSchema = new Schema({
    otp: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3000  
    }
});

const otpModel = model('otp', otpSchema);

export default otpModel;    