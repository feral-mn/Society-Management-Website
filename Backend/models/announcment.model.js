import {Schema, model} from 'mongoose';
import mongoose from 'mongoose';

const announcmentSchema = new Schema({
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
  },
  {timestamps: true}
);

const announcmentModel = model('announcment', announcmentSchema);

export default announcmentModel;    