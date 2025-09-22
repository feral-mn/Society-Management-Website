import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Plumber", "Electricity", "Sweeping", "Gardening", "Security", "Office"],
      required: true,
    }, 
    subCategory: {
      type: String, // e.g., "Fan not working / change of condenser"
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    emergency: {
      type: String,
      enum: ["urgent", "normal"], // 👈 new field
      default: "normal",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // link to user who submitted complaint
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
