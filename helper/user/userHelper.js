import { UserModel } from "../../model/userModel.js";
import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (error) {
    console.log(error);
  }
};
export const modelSubmission = async (data) => {
  try {
    let { phone, email, password } = data;
    console.log(data);
    const encrypt = await hashPassword(password);
    const authCollection = new UserModel({
      email,
      phone,
      password: encrypt,
    });
    await authCollection.save();
    return authCollection;
  } catch (error) {
    console.log(error);
  }
};
export const generatepasswordHelper = async(data)=>{
    let {phone,password} = data
    const user = await UserModel.findOne({phone:phone})
    let _id = user._id
    const encrypt = await hashPassword(password);
   return await UserModel.findByIdAndUpdate(_id, { $set: { password: encrypt } });
}

