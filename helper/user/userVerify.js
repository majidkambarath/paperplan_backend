import { UserModel } from "../../model/userModel.js";

const userVerfication = async (emailOrPhone) => {
  try {
    let phone = +emailOrPhone;
    console.log(phone);
    if (isNaN(phone)) {
      phone = "";
    }
    const authLogin = await UserModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: phone }],
    });
    return authLogin;
  } catch (error) {
    console.log(error);
  }
};

export { userVerfication };
