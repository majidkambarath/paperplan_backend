import {
  fetchUserCollectionHelper,
  userBlockORUnblockingHelper,
  fetchBookingApiHelper,
  LoginVerifyHelper,
  fetchClientsCount,
  fetchBookingCount,
  fetchTotalRevenueCount
} from "../../helper/admin/adminHelper.js";
import { UserModel } from "../../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../../utils/createToken.js";
import { AdminUserModel } from "../../model/AdminModel.js";

const fetchUserCollection = async (req, res) => {
  try {
    const fetch = await fetchUserCollectionHelper();
    res.status(200).json({ sucess: true, fetch });
  } catch (error) {
    console.log(error);
  }
};
const userBlockingApi = async (req, res) => {
  try {
    const id = req.query.id;
    const check = await userBlockORUnblockingHelper(id);
    const fetch = await UserModel.find();
    res.status(200).json({ success: true, check, fetch });
  } catch (error) {
    console.log(error);
  }
};

const fetchBookingApi = async (req, res) => {
  try {
    const fetch = await fetchBookingApiHelper();
    res.status(200).json({ sucess: true, fetch });
  } catch (error) {
    console.log(error);
  }
};
const LoginVerify = async (req, res) => {
  try {
    let { email, password } = req.body.values;
    const admin = await LoginVerifyHelper(email);
    if (!admin) {
      res.json({ action: true }).status(200);
    } else {
      const encryptPassword = admin.password;
      const matchPassword = await bcrypt.compare(password, encryptPassword);
      if (matchPassword) {
        const token = createToken(admin._id);
        res.status(200).json({
          success: true,
          token,
          admin,
        });
      } else {
        res.status(200).json({ success: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const AdminVerificationApi = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      res.json({ admin: false });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const adminId = decoded.id;
      const admin = await AdminUserModel.findById(adminId);

      if (admin) {
        res.status(200).json({ admin: true });
      } else {
        res.json({ admin: false });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
const fetchUsercount = async (req, res) => {
  try {
    const ClientsCount = await fetchClientsCount();
    res.status(200).json({ sucess: true, ClientsCount });
  } catch (error) {
    console.log(error);
  }
};
const fetchBookingCountApi = async (req, res) => {
  try {
    const bookingCount = await fetchBookingCount();
    res.status(200).json({ sucess: true, bookingCount });
  } catch (error) {
    console.log(error);
  }
};
const fetchRevenueCount = async (req, res) => {
  try {
    const totalRevenue = await fetchTotalRevenueCount();
    res.status(200).json({ sucess: true, totalRevenue });
  } catch (error) {
    console.log(error);
  }
};
export {
  fetchUserCollection,
  userBlockingApi,
  fetchBookingApi,
  LoginVerify,
  AdminVerificationApi,
  fetchUsercount,
  fetchBookingCountApi,
  fetchRevenueCount,
  
};
