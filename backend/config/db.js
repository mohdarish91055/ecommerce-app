import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv configure
dotenv.config();

//connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log("Connected to:", conn.connection.name);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

export default connectDB;
