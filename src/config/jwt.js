import jwt from "jsonwebtoken";
import { token } from "morgan";
// “Take user id → create token → sign it with secret → return token”

export const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id }, // payload and who the user is
    process.env.JWT_SECRET, // secret key
    { expiresIn: "1d" }, //expiry duration
  );

  return token;
};

export const verifyToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken;
  } catch (error) {
    throw error;
  }
};
