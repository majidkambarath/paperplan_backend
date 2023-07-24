import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  action:{
    type:Boolean,
    default:true
  }
});

// Create the user model
const UserModel = new mongoose.model("User", UserSchema);   
export { UserModel };
