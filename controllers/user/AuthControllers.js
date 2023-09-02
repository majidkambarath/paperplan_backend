import {
  checkVerificationToken,
  sendVerificationToken,
  resendVerificationToken,
} from "../../config/twilio.js";
import { StartChatBotHelper } from "../../helper/user/chatBotHelper.js";
import { modelSubmission,generatepasswordHelper } from "../../helper/user/userHelper.js";
import { userVerfication } from "../../helper/user/userVerify.js";
import { createToken } from "../../utils/createToken.js";
import bcrypt from "bcrypt";
import { UserModel } from "../../model/userModel.js";
createToken;
export const sendOtpApi = async (req, res) => {
  try {
    let phone = req.body.phone;
    // console.log(first)
   await sendVerificationToken(phone);
    res.status(200).json({ action: true });
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    let { otp, phone } = req.body.data;
    const check = await checkVerificationToken(otp, phone);
    if (check) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ action: false });
    }
  } catch (error) {
    console.log(error);
  }
};
export const ResendOtp = async (req, res) => {
  try {
    let { data } = req.body;
   await resendVerificationToken(data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const AuthForm = async (req, res) => {
  try {
    const value = req.body.value;
    const phone = +value.phone;
    const email = value.email;
    const password = value.password;
    const data = {
      phone,
      email,
      password,
    };
    await modelSubmission(data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

export const loginVerify = async (req, res) => {
  try {
    let { emailOrPhone, password } = req.body;
    const userData = await userVerfication(emailOrPhone);
    if (userData) {
      const encryptPassword = userData.password;
      const matchPassword = await bcrypt.compare(password, encryptPassword);
      if (userData.action === true) {
        if (matchPassword) {
          const token = createToken(userData._id);
          res.status(200).json({
            success: true,
            token,
            userData,
          });
        } else {
          res.status(200).json({ success: false });
        }
      } else {
        res.status(200).json({ action: true });
      }
    } else {
      console.log("invalid user");
      res.status(200).json({ action: false });
    }
   
  } catch (error) {
    console.log(error);
  }
};

export const StartWithChatBot = async(req,res)=>{
  try {
     const id = req.Token
     await StartChatBotHelper(id)
  } catch (error) {
     console.log(error)
  }
}

export const forgotpassSender = async(req,res)=>{
  try {
    let phone = req.body.phone;
    let user = await UserModel.findOne({phone:phone})
    if(!user){
      res.status(200).json({ success: false });
    }
    sendVerificationToken(phone);
    res.status(200).json({ action: true });
  } catch (error) {
    console.log(error)
  }
}
export const forgotPassverify = async(req,res)=>{
  try {
    let { otp, phone } = req.body.data;
    const check = await checkVerificationToken(otp, phone);
    if (check) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ action: false });
    }
  } catch (error) {
    console.log(error)
  }
}
export const forgotresenderotp = async(req,res)=>{
  try {
    let { data } = req.body;
   await resendVerificationToken(data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error)
  }
}

export const generatepasswordApi = async(req,res)=>{
  try {
    let {phone,password} = req.body.values
    let data = {
      phone,password
    }
    await generatepasswordHelper(data)
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error)
  }
}
