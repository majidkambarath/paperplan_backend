import mongoose from "mongoose";
import { UserModel } from "../../model/userModel.js";
import { BookingModel } from "../../model/bookingModel.js";
import { AdminUserModel } from "../../model/AdminModel.js";

const fetchUserCollectionHelper = async () => {
  try {
    const response = await UserModel.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const userBlockORUnblockingHelper = async (id) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    let newstate;

    if (user.action === true) {
      newstate = false;
    } else {
      newstate = true;
    }

    await UserModel.findByIdAndUpdate(
      { _id: id },
      { $set: { action: newstate } }
    );

    // Return the new action state after the update.
    return newstate;
  } catch (error) {
    console.log(error);
  }
};

const fetchBookingApiHelper = async () => {
  try {
    const response = await BookingModel.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};

const LoginVerifyHelper = async (email) => {
  try {
    const adminData = await AdminUserModel.findOne({ email: email });
    return adminData;
  } catch (error) {
    console.log(error);
  }
};

const fetchBookingCount = async () => {
  try {
    return await BookingModel.find().count();
  } catch (error) {}
};

const fetchClientsCount = async () => {
  try {
    return await UserModel.find().count();
  } catch (error) {}
};

const fetchTotalRevenueCount = async () => {
  try {
    const totalRevenue = await BookingModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$TotalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    return totalRevenue[0].total;
  } catch (error) {}
};

export {
  fetchUserCollectionHelper,
  fetchBookingCount,
  fetchTotalRevenueCount,
  fetchClientsCount,
  userBlockORUnblockingHelper,
  fetchBookingApiHelper,
  LoginVerifyHelper,
};
