import jwt from "jsonwebtoken";
import { UserModel } from "../model/userModel.js";

export const authorizationCheck = async(req,res,next)=>{
    try {
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
           
          const token = req.headers.authorization.split(" ")[1];
          const decoded  = jwt.verify(
            token,
            process.env.JWT_SECRET 
          );
          if (typeof decoded !== "string") {
            const user = await UserModel.findById(decoded.id);
            const userID = user._id;
            if (!user) {
              res.status(401).json({ message: "Invalid token" });
            } else {
              if(user.action===true){
                req.Token = userID;
                next();
              }else{
                res.status(401).json({ message: "User is Blocked" , action:true });
              }
            }
          }
        } else {
          res.status(401).json({ message: "No authorization" });
        }
      } catch (error) {
        next(error);
      }
}

