import userModel from '../models/user.model.js';
import otpModel from '../models/otp.model.js';
import blacklistedTokenModel from '../models/token.model.js';
import {sendSMS, generateOTP} from '../services/otp.service.js' 

const cookieOptions = {
    maxAge: 24*60*60*1000,
    httpOnly: true,
    secure: false, // change to true for production
    sameSite: 'Lax'
}

async function register(req, res){
    const {fullname, username, email, password, flatNumber, block, mobile, isLiving, ownershipType, role} = req.body;
    try{
        const user = await userModel.create({fullname, username, email, password, flatNumber, block, mobile, isLiving, ownershipType, role});
        const token = user.token;
        return res.status(201)
            .cookie('token', token, cookieOptions)
            .json({
                message: "User registered successfully",
                token: token,
                user: {
                    id: user._id,
                    fullname: user.fulltname,
                    username: user.username,
                    email: user.email,
                    flatNumber: user.flatNumber,
                    block: user.block,
                    mobile: user.mobile,
                    isLiving: user.isLiving,
                    ownershipType: user.ownershipType,
                    role: user.role
                }
            })
    }
    catch(err){
        if(err.code === 11000){
            // Duplicate key error
            return res.status(400).json({
                message: "Email already exists",
                error: err.message
            });
        }
        return res.status(500).json({
            message: "Error during user registration:",
            error: err.message
        });
        console.error("Error during user registration:", err)
    }
}

async function login(req, res){
    const {username, password, mobile} = req.body;
    try{
        if(req.isAuthenticated){
            return res.status(201)
            .json({
                message: "User already is login",
            })
        }
        const user = await userModel.findOne({ username }).select('+password');
        //If user not found
        if(!user) return res.status(404).json({ message: "User not found" });
        //If user found
        const isMatch = await user.comparePassword(password);
        //Paswoord doesn't match
        if(!isMatch) return res.status(401).json({ message: "Incorrect Password" });
        //Password matches
        const otp = await generateOTP(user._id);
        const response = await sendSMS(mobile, otp);
        return res.status(201)
            .json({
                response: response,
            })
    }
    catch(err){
        return res.status(500).json({
            message: "Error during user login:",
            error: err.message
        });
        console.error("Error during user login:", err);
    }
}

async function verify(req, res){
    const {otp} = req.body;
    try{
        const otpFound = await otpModel.findOne({otp})
        //If Entered Wrong OTP
        if(!otpFound) return res.status(404).json({ message: "Entered wrong OTP" });
        //Entered right OTP
        const userId = otpFound.userId
        const user = await userModel.findById(userId)
        const token = await user.generateJWT();
        await otpModel.deleteOne({userId})//Deleting the otp
        return res.status(201)
            .cookie('token', token, cookieOptions)
            .json({
                message: "User login successfull",
                token: token,
                user: {
                    id: user._id,
                    fullname: user.fulltname,
                    username: user.username,
                    email: user.email,
                    flatNumber: user.flatNumber,
                    block: user.block,
                    mobile: user.mobile,
                    isLiving: user.isLiving,
                    ownershipType: user.ownershipType,
                    role: user.role
                }
            })
        }catch(err){
            return res.status(500).json({
                message: "Error during user OTP Verifying:",
                error: err.message
            });
        console.error("Error during user login:", err);
    }
    
}
async function profile(req, res){
    const user = req.user;
    return res.status(200).json({
        message: "User profile fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile
        }
    });
}

function logout(req, res){
    console.log('logout')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    blacklistedTokenModel.create({ token });
    res.clearCookie('token', null, {maxAge: 0, httpOnly: true, secure: true})
    .status(200)
    .json({
        success: true,
        message: 'Logged out successfully'
    })
 }
export { register, login, verify, profile, logout };