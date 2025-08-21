import fast2sms from 'fast-two-sms'
import crypto from "crypto";
import otpModel from "../models/otp.model.js"
import axios from "axios"

async function generateOTP(userId) {
  // Only digits
  const digits = "0123456789";
  let otp = "";
  const length = 6;
  // Use cryptographically strong random values
  for (let i = 0; i < length; i++) {
    const idx = crypto.randomInt(0, digits.length);
    otp += digits[idx];
  }

  try{
    const otpStored = await otpModel.create({otp, userId})
    if(otpStored){
        console.log("OTP Genrated Sucessfully"+otpStored.otp)
        return otp;
    }
  }catch(err){
        console.error("Error in genrating otp", err)
  }
}

async function sendSMS(mobile, otp){
    const smsData = {
        //sender_id: "FSTSMS",
        message: `Your OTP is ${otp}`,
        language: "english",
        route: "q",
        numbers: mobile
    }
    const apiKey = process.env.FAST2SMS_API_KEY
    try{
        const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", smsData, {
            headers: {
                Authorization: apiKey
            }
        })
        if(response){
            console.log("MEssage Sent Succesfully")
            return response.data
        }        
    }catch(err){
        console.error("Error during sending SMS via fast2sms:", err);
    }
    
}

export  {sendSMS, generateOTP};


