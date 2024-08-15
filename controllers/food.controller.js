import mongoose from "mongoose";
import foodModel from "../models/food.model.js";
import fs from "fs";

// post a food

const postFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const {
    name,
    description,
    price,
    category,
    image = image_filename,
  } = req.body;
  const food = await foodModel.create({
    name,
    description,
    price,
    category,
    image,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list

const listFoods = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

// remove food item

const removeFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({ message: "Invalid Id" });
    }
    const food = await foodModel.findByIdAndDelete(id);
    res.status(200).json(food);

    fs.unlink(`uploads/${food.image}`, () => {});
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export { postFood, listFoods, removeFoodItem };
