import { compare } from "bcrypt";
import userModel from "../model/userModel.js";
import { comparePassword, hashPassword } from "./../helper/authHelper.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import orderModel from "../model/orderModel.js";

//dotenv configure
dotenv.config();

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone no is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    if (!answer) {
      return res.send({ message: "answer is required" });
    }
    //check user
    const existingUser = await userModel.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "already register please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Registeration",
      error,
    });
  }
};

//post login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email and password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "email is not register",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(404)
        .send({ success: false, message: "invalid password" });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "email is required",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "answer is required",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New Password is required",
      });
    }

    //check
    const user = await userModel.findOne({ email, answer });
    //vaklidation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    //update
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//testController
export const testController = (req, res) => {
  res.send("protected routes");
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password check
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting orders",
      error,
    });
  }
};

//place order
export const placeOrderController = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    const order = new orderModel({
      products: items.map((item) => item.product._id),
      payment: {
        method: paymentMethod,
        amount: totalAmount,
        address: shippingAddress,
      },
      buyer: req.user._id,
    });

    await order.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to place order",
      error,
    });
  }
};

// all order
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while updating order",
      error,
    });
  }
};

//get all user for admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: 0 }).select("-password"); // Exclude passwords
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching users",
      error,
    });
  }
};

//cancel the order
export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ message: "Delivered orders cannot be canceled" });
    }

    order.status = "Canceled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    console.log("order controller", error);
  }
};
