import { UserModel } from "../../model/userModel.js";
import twilio from "twilio";
// import {MessagingResponse} from ''
export const StartChatBotHelper = async (id) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body: "Hello! Welcome to Healtehter.\nHow can we assist you?\n\n1. Type 'book' to book an appointment.\n2. Type 'info' to get clinic information.",
        to: `whatsapp:+91${user.phone}`,
      })
      .then((res)=>{
          console.log(res)
      });
  } catch (error) {
    console.log(error)
  }

   
};

