import { Router } from "express";
import {sendOtpApi, verifyOtp ,ResendOtp,AuthForm}  from "../../controllers/AuthControllers.js";

const router = Router()

router.post('/sendotp',sendOtpApi)
router.route('/verifyotp').post(verifyOtp)
router.post('/resendotp',ResendOtp)
router.post('/authform',AuthForm)
export default router