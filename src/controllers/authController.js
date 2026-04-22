import { comparePassword, hashPassword } from "../config/bcrypt.js";
import { generateToken } from "../config/jwt.js";
import { createNewUser } from "../models/users/UserModel.js";
import User from "../models/users/UserSchema.js";

export const insertNewUser = async (req, res) => {
  // 👉 get data → validate → check duplicate → hash → save → respond
  console.log("controller started");
  // 1.receiving the data from the body
  const { fName, lName, email, password } = req.body;
  // 2.validating the missing fields
  if (!fName || !lName || !email || !password) {
    return res.send("Error missing field");
  }
  // 3.checking if the duplicate user exist or not
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.send("Duplicate user");
  }
  // 4.hash the password
  const hashedPassword = await hashPassword(password);

  // 5.prepareing the data
  const obj = {
    fName,
    lName,
    email,
    password: hashedPassword,
  };
  // 6.saving the user to db
  await createNewUser(obj);
  console.log("User created successfully");

  // 7. response
  return res.send("User created successfully");
};

export const loginUser = async (req, res) => {
  //1.getting the email and password
  const { email, password } = req.body;

  // 2.validating the missing field

  if (!email || !password) {
    return res.send("Missing field");
  }

  // 3.finding the user by email
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.send("Error, user not found");
  }

  //4. comparing the password with stored password
  const findPassword = await comparePassword(password, findUser.password);
  if (!findPassword) {
    return res.send("Password doesnot match");
  }

  const token = generateToken(findUser);

  return res.send({
    message: "Login successful",
    token,
  });
};
