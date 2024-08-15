import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://hossain7:Mha1324@cluster0.hctam.mongodb.net/food-del"
    )
    .then(() => console.log("Db connect"));
};
