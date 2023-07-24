import { Router } from "express";
import {
  fetchUserCollection,
  userBlockingApi,
  fetchBookingApi,
  LoginVerify,
  AdminVerificationApi,
  fetchUsercount,
  fetchBookingCountApi,
  fetchRevenueCount
} from "../../controllers/admin/AdminUser.js";
const router = Router();
router.get("/fetchUserData", fetchUserCollection);
router.patch("/userBlockingApi", userBlockingApi);
router.get("/fetchBooking", fetchBookingApi);
router.post("/loginVerify", LoginVerify);
router.post("/verify-token", AdminVerificationApi);
router.get('/fetchUserCount',fetchUsercount)
router.get('/fetchBookingCount',fetchBookingCountApi)
router.get('/fetchRevenueCount',fetchRevenueCount)
export default router;
