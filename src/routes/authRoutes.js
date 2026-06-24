import express from "express";
import { forgotPasswordController, getUserProfilerController, insertNewUser, loginUser, updatePasswordController, updateUserProfile } from "../controllers/authController.js";
import { authValidation } from "../middleware/validation/authValidation.js";

const router = express.Router();

//POST router for creating user
router.post("/register", insertNewUser);

// POST router to get the user info
router.post("/login", loginUser)
// router.post("/login", (req, res) => {
//   return res.send("LOGIN ROUTE HIT");
// });

router.get("/profile", authValidation ,getUserProfilerController)

router.patch("/update-password", authValidation, updatePasswordController)

router.patch("/update-profile", authValidation, updateUserProfile )

router.post("/forgot-password", forgotPasswordController)

export default router;