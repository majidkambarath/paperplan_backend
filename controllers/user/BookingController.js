import {
  bookingCollection,
  fetchCollectionAPi,
  updateCollectionApi,
} from "../../helper/user/bookigHelper.js";
import { instance } from "../../config/razorpay.js";
import crypto from "crypto";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "../../model/userModel.js";

const bookingController = async (req, res) => {
  try {
    let { businessType, doctorCount, inbound, name, phone } = req.body.data;
    let id = req.Token;
    const userId = new mongoose.Types.ObjectId(id);
    const data = {
      businessType,
      doctorCount,
      inbound,
      name,
      phone,
      userId,
    };
    await bookingCollection(data);
    res.json({ success: true }).status(200);
  } catch (error) {
    console.log(error);
  }
};
const fetchCollection = async (req, res) => {
  try {
    let id = req.Token;
    console.log(id);
    const userId = new mongoose.Types.ObjectId(id);
    const fetch = await fetchCollectionAPi(userId);
    console.log(fetch);
    res.json({ success: true, fetch }).status(200);
  } catch (error) {
    console.log(error);
  }
};

const payemntProcess = async (req, res) => {
  try {
    let { data } = req.body;
    const receiptId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // random reciept id generating
    const options = {
      amount: data * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${receiptId}`,
      payment_capture: 1,
    };
    const order = await instance.orders.create(options);
    if (!order) {
      res.status(401).json({ message: "something went wrong" });
    } else {
      res.status(200).json({
        sucess: true,
        order,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const paymentSucess = async (req, res) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } =
      req.body.paymentData;
    const signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex");
    if (signature !== razorpaySignature) {
      res.json({ message: "Transcation is not legit" }).status(400);
    } else {
      let { BookingID } = req.body.paymentData;
      await updateCollectionApi(BookingID);
      res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const TokenVerificationApi = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      res.json({ user: false });
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const user = await UserModel.findById(userId);
      console.log(user);

      if (user) {
        res.status(200).json({ user: true });
      } else {
        res.json({ user: false });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ error: error.message, action: true });
  }
};

export {
  bookingController,
  fetchCollection,
  payemntProcess,
  paymentSucess,
  TokenVerificationApi,
};
