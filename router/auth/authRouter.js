import { Router } from "express";
import {sendOtpApi, verifyOtp ,ResendOtp,AuthForm,loginVerify}  from "../../controllers/AuthControllers.js";
import { bookingController,fetchCollection,payemntProcess,paymentSucess ,TokenVerificationApi } from "../../controllers/BookingController.js";
import {authorizationCheck} from '../../middelware/jwt_authorization.js'
const router = Router()

router.post('/sendotp',sendOtpApi)
router.post('/verifyotp',verifyOtp)
router.post('/resendotp',ResendOtp)
router.post('/authform',AuthForm)

router.post('/authlogin',loginVerify)

router.post('/bookingform',authorizationCheck,bookingController)
router.get('/fetchBooking',authorizationCheck,fetchCollection)
router.post('/payment', payemntProcess)
router.post('/paymentsuccess',paymentSucess)

router.post('/verify-token',TokenVerificationApi)
export default router