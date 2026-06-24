import { comparePassword, hashPassword } from "../config/bcrypt.js";
import { generateToken } from "../config/jwt.js";
import { generateBasicOTP } from "../config/randomGenerate.js";
import { createOTP } from "../models/otp/otpModel.js";
import {
  createNewUser,
  getUser,
  updateUser,
} from "../models/users/UserModel.js";
import User from "../models/users/UserSchema.js";

export const insertNewUser = async (req, res) => {
  // 👉 get data → validate → check duplicate → hash → save → respond
  console.log("controller started");
  // 1.receiving the data from the body
  const { fName, lName, email, password } = req.body;
  // 2.validating the missing fields
  if (!fName || !lName || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Missing field",
    });
  }
  // 3.checking if the duplicate user exist or not
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(409).json({
      status: "error",
      message: "Duplicate user",
    });
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
  return res.status(201).json({
    status: "success",
    message: "User created successfully",
  });
};

export const loginUser = async (req, res) => {
  //1.getting the email and password
  const { email, password } = req.body;

  // 2.validating the missing field

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Missing Fields",
    });
  }

  // 3.finding the user by email
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(201).json({
      status: "error",
      message: "Error, user not found",
    });
  }

  //4. comparing the password with stored password
  const findPassword = await comparePassword(password, findUser.password);
  if (!findPassword) {
    return res.status(201).json({
      status: "error",
      message: "Password doesnot match ",
    });
  }
  const token = generateToken(findUser);

  return res.send({
    message: "Login successful",
    token,
    status: "success",
    findUser,
  });
};

export const getUserProfilerController = async (req, res) => {
  try {
    const user = req.user.id;
    const result = await getUser(user);
    if (!result) {
      return res.status(200).json({
        status: "error",
        message: "Profile could not be found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Here, is your profile",
      payload: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    // 1.get passsword, new password and confirm password from the body
    const { password, newPassword, confirmPassword } = req.body;

    // 2. getting the user from the user.id
    const user = req.user.id;
    console.log(user);
    const result = await getUser(user);
    if (!password || !newPassword || !confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "All fields are",
      });
    }
    if (!result) {
      return res.status(200).json({
        status: "error",
        message: "Profile could not be found",
      });
    }

    // comparing the old password with hashedpassword
    const compareNewPassword = await comparePassword(password, result.password);
    if (!compareNewPassword) {
      return res.status(200).json({
        status: "error",
        message: "Password doesnot match",
      });
    }
    //  4.comparing new password with confirm password
    if (newPassword !== confirmPassword) {
      return res.status(200).json({
        status: "error",
        message: "new password doesnot match with confirm password",
      });
    }

    // 5.creating a newhashedpassword using the new password given by user
    const newHashedPassword = await hashPassword(newPassword);

    // 6.creating a obj to update in db and update user
    const obj = {
      password: newHashedPassword,
    };

    await updateUser(user, obj);
    // 7.success message
    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    // 8.error handling
    return res.status(402).json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { fName, lName, location, phone } = req.body;

    const user = req.user.id;
    if (!fName || !lName || !location || !phone) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const obj = {
      fName,
      lName,
      location,
      phone,
    };

    const updatedUser = await updateUser(user, obj);
    return res.status(200).json({
      status: "success",
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.message,
      user: updatedUser,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        status: "error",
        message: "Email is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
      const otp = generateBasicOTP();
      let expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      // if(!expiresAt) {
      //   return res.status(403).json({
      //     status: "error",
      //     message: "Your otp expired, try again"
      //   });
      // }
      const result = await createOTP({
        email,
        otp,
        expiresAt,
      });

      return res.status(200).json({
        status: "success",
        message: " OTP generated successfully",
        // result,
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
