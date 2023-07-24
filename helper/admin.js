
import { UserModel } from "../model/userModel.js";
import { BookingModel } from "../model/bookingModel.js";
import { AdminUserModel } from "../model/AdminModel.js";

export const fetchUserCollectionHelper = async () => {
  return await UserModel.find();
};

export const userBlockORUnblockingHelper = async (_id) => {
  const user = await UserModel.findOne({ _id });
  await UserModel.findByIdAndUpdate(_id, { $set: { action: !user.action } });
  return !user.action;
};

export const fetchBookingApiHelper = async () => {
  return await BookingModel.find();
};

export const LoginVerifyHelper = async (email) => {
  return await AdminUserModel.findOne({ email: email });
};

export const fetchBookingCount = async () => {
  return await BookingModel.find().count();
};

export const fetchClientsCount = async () => {
  return await UserModel.find().count();
};

export const fetchTotalRevenueCount = async () => {
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
