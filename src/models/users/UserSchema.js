import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    phone: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    newPassword: {
      type: String
    },
    
    confirmPassword: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
