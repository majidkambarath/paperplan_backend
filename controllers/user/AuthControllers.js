import {
  checkVerificationToken,
  sendVerificationToken,
  resendVerificationToken,
} from "../../config/twilio.js";
import { StartChatBotHelper } from "../../helper/user/chatBotHelper.js";
import { modelSubmission } from "../../helper/user/userHelper.js";
import { userVerfication } from "../../helper/user/userVerify.js";
import jwt from "jsonwebtoken";
import { createToken } from "../../utils/createToken.js";
import bcrypt from "bcrypt";
createToken;
const sendOtpApi = async (req, res) => {
  try {
    let phone = req.body.phone;
    sendVerificationToken(phone);
    res.status(200).json({ action: true });
  } catch (error) {
    console.log(error);
  }
};
const verifyOtp = async (req, res) => {
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
const ResendOtp = async (req, res) => {
  try {
    let { data } = req.body;
    resendVerificationToken(data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const AuthForm = async (req, res) => {
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
    const response = await modelSubmission(data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const loginVerify = async (req, res) => {
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
    console.log(userData);
  } catch (error) {
    console.log(error);
  }
};

const StartWithChatBot = async(req,res)=>{
  try {
     const id = req.Token
     await StartChatBotHelper(id)
  } catch (error) {
     console.log(error)
  }
}

export { sendOtpApi, verifyOtp, ResendOtp, AuthForm, loginVerify ,StartWithChatBot};
