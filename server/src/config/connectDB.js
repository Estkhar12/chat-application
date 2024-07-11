import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    return console.log("Databse is successfully connected!");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
