import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    fullname: { 
        type: String, 
        required: true, 
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'], 
        maxlength: [50, 'First name must be at most 50 characters long'] 
    },
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true,
    },
    flatNumber: { 
        type: String, 
        required: true 
    },
    block: { 
        type: String,
        enum:["A","B","C","D"] 
    }, 
    mobile: { 
        type: String, 
        required: true,
        minlength: [10, 'First name must be at least 2 characters long'], 
        maxlength: [10, 'First name must be at most 50 characters long'] 
    },

    isLiving: { type: Boolean, default: true },
    ownershipType: { 
      type: String, 
      enum: ["owner", "tenant"], 
      default: "owner" 
    },
    role: { 
      type: String, 
      enum: ["user", "admin", "superadmin"], 
      default: "user" 
    },
    isActive: { type: Boolean, default: true }, // for admins and users

    // Admin/Authority Fields
    designation: { type: String }, // e.g. Treasurer, Secretary, etc. (if Admin)

    // 🛡️ Security & Tracking
    lastLogin: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // superadmin/admin
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

userSchema.methods = {
    generateJWT: async function() {
        const token = await jwt.sign({id: this._id, mobile: this.mobile, role: this.role}, process.env.JWT_SECRET, {expiresIn: '3h'});
        return token;
    },
    comparePassword: async function(password){
        return await bcrypt.compare(password, this.password);
    }
}

userSchema.post('save', async function(doc, next) {
    try{
        const token = await doc.generateJWT();
        doc.token = token; // Add token to the document
        next();
    }
    catch(err) {
        next(err);
    }
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const userModel = mongoose.model('User', userSchema);

export default userModel
