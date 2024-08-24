import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const createToken = (id) => {
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "30d" };

  const token = jwt.sign({ id }, secret, options);
  return token;
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("Token has expired");
    } else if (err.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    }
    return null;
  }
};

export { createToken, verifyToken };
