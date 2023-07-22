import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    ref:'users'
  },
  name: {
    type: String,
  },
  phone:{
    type:Number,
    unique: true,
  },
  businessType: {
    type: String,
  },
  businessCount: {
    type: String,
  },
  businessInbound: {
    type: String,
  },
  PaymentStatus: {
    type: String,
    default :'Pending'
  },
  TotalAmount:{
    type:Number
  }
},{timestamps:true});

// Create the Booking model
const BookingModel = new mongoose.model("Booking", BookingSchema);   
export { BookingModel };
