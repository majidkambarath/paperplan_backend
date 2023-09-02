import { Router } from "express";
import {
  sendOtpApi,
  verifyOtp,
  ResendOtp,
  AuthForm,
  loginVerify,
  StartWithChatBot,
  forgotpassSender,
  forgotPassverify,
  forgotresenderotp,
  generatepasswordApi
} from "../../controllers/user/AuthControllers.js";
import {
  bookingController,
  fetchCollection,
  payemntProcess,
  paymentSucess,
  TokenVerificationApi,
} from "../../controllers/user/BookingController.js";
import { authorizationCheck } from "../../middelware/jwt_authorization.js";
const router = Router();

router.post("/sendotp", sendOtpApi);
router.post("/verifyotp", verifyOtp);
router.post("/resendotp", ResendOtp);
router.post("/authform", AuthForm);

router.post("/authlogin", loginVerify);

router.post("/bookingform", authorizationCheck, bookingController);
router.get("/fetchBooking", authorizationCheck, fetchCollection);
router.post("/payment", payemntProcess);
router.post("/paymentsuccess", paymentSucess);

router.post("/verify-token", TokenVerificationApi);
router.get('/startChatBot',authorizationCheck,StartWithChatBot)
router.post('/forgotpassSendotp',forgotpassSender)
router.post('/forgotPassverifyotp',forgotPassverify)
router.post('/forgotresendotp',forgotresenderotp)
router.post('/generatepassword',generatepasswordApi)

export default router;




