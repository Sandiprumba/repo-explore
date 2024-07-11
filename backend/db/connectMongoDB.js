import mongoose from "mongoose";

export default async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO-DB CONNECTED");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
}
