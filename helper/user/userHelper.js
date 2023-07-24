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
const modelSubmission = async (data) => {
  try {
    let { phone, email, password } = data;
    console.log(data);
    const encrypt = await hashPassword(password);
    const authCollection = new UserModel({
      email: email,
      phone: phone,
      password: encrypt,
    });
    await authCollection.save();
    return authCollection;
  } catch (error) {
    console.log(error);
  }
};

export { modelSubmission };
