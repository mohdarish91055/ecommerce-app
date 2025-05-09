import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";
import dotenv from "dotenv";

//dotenv configure
dotenv.config();

//protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token required" });

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "unauthorized access",
        role: user.role,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in admin middleware",
    });
  }
};
