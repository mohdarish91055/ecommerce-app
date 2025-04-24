import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoute.js";

//rest object
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ecommerce-app-1-7obg.onrender.com",
    ],
    credentials: true,
  })
);

//database config
connectDB();

//dotenv configure
dotenv.config();

//middeleares
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

//checking
app.get("/", (req, res) => {
  res.send("server is running");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoute);

//port
const PORT = process.env.PORT || 5000;
//run listen
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
