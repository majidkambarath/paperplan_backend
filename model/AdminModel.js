import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

// Create the user model
const AdminUserModel = new mongoose.model("Admin", AdminUserSchema);   
export { AdminUserModel };
