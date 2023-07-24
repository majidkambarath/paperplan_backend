import { BookingModel } from "../../model/bookingModel.js";

const bookingCollection = async (data) => {
  try {
    let { businessType, doctorCount, inbound, name, phone, userId } = data;
    function generateRandom4DigitPrice() {
      const minPrice = 1000;
      const maxPrice = 9999;
      return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    }
    const BookingCollection = new BookingModel({
      businessType: businessType,
      businessCount: doctorCount,
      businessInbound: inbound,
      TotalAmount: generateRandom4DigitPrice(),
      userId: userId,
      name: name,
      phone: phone,
    });
    await BookingCollection.save();
    return BookingCollection;
  } catch (error) {
    console.log(error);
  }
};

const fetchCollectionAPi = async (id) => {
  try {
    const resData = await BookingModel.find({ userId: id });
    return resData;
  } catch (error) {
    console.log(error);
  }
};

const updateCollectionApi = async (id) => {
  try {
    const updateRes = await BookingModel.findOneAndUpdate(
      { _id: id },
      { $set: { PaymentStatus: "Success" } },
      { new: true }
    );
    return updateRes;
  } catch (error) {
    console.log(error);
  }
};

export { bookingCollection, fetchCollectionAPi, updateCollectionApi };
