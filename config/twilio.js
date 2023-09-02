import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const { TWILIO_SERVICE_ID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendVerificationToken = (moblie) => {
  return new Promise((resolve) => {
    client.verify.v2
      .services(TWILIO_ACCOUNT_SID)
      .verifications.create({
        to: `+91${moblie}`,
        channel: "whatsapp",
      })
      .then((data) => {
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });
  });
};

const checkVerificationToken = (otp, phoneNumber) => {
  return new Promise((resolve) => {
    client.verify.v2
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({
        to: `+91${phoneNumber}`,
        code: otp,
      })
      .then((data) => {
        if (data.valid) {
          resolve(true);
       
        } else {
          resolve(false);
          
        }
      })
      .catch((err) => {
        console.log(err);
       
         resolve(false);
      });
  });
};

const generateOTP = (length) => {
    const charset = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      otp += charset[randomIndex];
    }
    return otp;
  };

  const resendVerificationToken = (mobile) => {
    const newOTP = generateOTP(6); // Generate a new 6-digit OTP
  
    return new Promise((resolve) => {
      client.verify.v2
        .services(TWILIO_SERVICE_ID)
        .verifications.create({
          to: `+91${mobile}`,
          channel: "whatsapp",
          code: newOTP, // Pass the new OTP to the Twilio API
        })
        .then((data) => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          resolve(false);
        });
    });
  };

export { sendVerificationToken, checkVerificationToken , resendVerificationToken  };
