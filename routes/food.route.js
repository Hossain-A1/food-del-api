import express from "express";

import { listFoods, postFood,  removeFoodItem } from "../controllers/food.controller.js";

import multer from "multer";

const foodRouter = express.Router();

// image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/post", upload.single("image"), postFood);

// list all food

foodRouter.get("/list",listFoods)

// remove a food item

foodRouter.delete("/:id",removeFoodItem)


export default foodRouter;
