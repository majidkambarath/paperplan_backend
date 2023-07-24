import { BookingModel } from "../../model/bookingModel.js";

export const bookingCollection = async (data) => {
  try {
    let { businessType, doctorCount, inbound, name, phone, userId } = data;
    function generateRandom4DigitPrice() {
      const minPrice = 1000;
      const maxPrice = 9999;
      return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    }
    const BookingCollection = new BookingModel({
      businessType,
      businessCount: doctorCount,
      businessInbound: inbound,
      TotalAmount: generateRandom4DigitPrice(),
      userId,
      name,
      phone,
    });
    await BookingCollection.save();
    return BookingCollection;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCollectionAPi = async (id) => {
  return await BookingModel.find({ userId: id });
};

export const updateCollectionApi = async (id) => {
  const updateRes = await BookingModel.findOneAndUpdate(
    { _id: id },
    { $set: { PaymentStatus: "Success" } },
    { new: true }
  );
  return updateRes;
};
