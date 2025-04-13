import express from "express";
import { requireSignIn } from "../middleware/authMiddleware.js";
import {
  addtoCartController,
  clearCartController,
  getCartController,
  removeFromCartController,
} from "../controller/cartControllers.js";

const router = express.Router();

//add
router.post("/add", requireSignIn, addtoCartController);

//get
router.get("/get", requireSignIn, getCartController);

//remove
router.delete("/remove", requireSignIn, removeFromCartController);

//clear all
router.delete("/clear", requireSignIn, clearCartController);

export default router;
