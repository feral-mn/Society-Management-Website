import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const complaintSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
        unique: false,
    },
    status: {
        type: String,
        enum: ["pending", "inProgress", "resolved"],
        default: "pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
  },
  {timestamps: true}
);

const complaintModel = model('complaint', complaintSchema);

export default complaintModel;    