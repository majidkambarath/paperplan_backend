import { checkVerificationToken, sendVerificationToken ,resendVerificationToken} from "../config/twilio.js";
import { modelSubmission } from "../helper/userHelper.js";
const sendOtpApi = async (req, res) => {
  try {
     let phone = req.body.phone
      sendVerificationToken(phone)
      res.status(200).json({ action: true})
  } catch (error) {
    console.log(error);
  }
};
const verifyOtp = async (req,res) =>{
    try {
        let {otp,phone} = req.body.data
       const check =  await checkVerificationToken(otp,phone)
       if(check){
        res.status(200).json({ success: true})
       }else{
        res.status(200).json({ action: false})
       }
    } catch (error) {
      console.log(error)  
    }
}
const ResendOtp = async (req,res) =>{
    try {
        let {phone} = req.body
        resendVerificationToken(phone)
        res.status(200).json({ success: true})
    } catch (error) {
      console.log(error)  
    }
}

const AuthForm = async(req,res)=>{
    try {
          const value = req.body.value
          const phone = +value.phone
          const email = value.email
          const password = value.password
          const data = {
            phone,
            email,
            password
          }
         const response = await modelSubmission(data)

    } catch (error) {
        console.log(error)
    }
}
export { sendOtpApi ,verifyOtp,ResendOtp,AuthForm };
