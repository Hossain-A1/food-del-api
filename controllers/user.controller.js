import userModel from "../models/user.model.js";

import validator from "validator";
import bcrypt from "bcrypt";
import { createToken } from "../manager/jwt-token-manager.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const used_email = await userModel.findOne({ email });

  if (used_email) {
    return res.json({ message: "Email already used" });
  }
  if (!validator.isEmail(email)) {
    return res.json({ message: "Invalid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.json({
      message: "Password must be 8char+ with uppercase, number & symbol,",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashPass = await bcrypt.hash(password, salt);

  try {
    const newUser = new userModel({
      name,
      email,
      password: hashPass,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Please fill in this all fields" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ mssage: "Incorrect email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Register first" });
    }

    const token = createToken(user._id);

    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

export { registerUser, loginUser };
