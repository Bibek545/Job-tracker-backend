import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true,
    },
        email: {
        type: String,
        required: true,
        unique: true,
        index: 1
    },
        phone: {
        type: String,
        // required: true,
    },
        password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        // required: true,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
});

export default mongoose.model("User", userSchema);