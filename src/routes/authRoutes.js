import express from "express";
import { insertNewUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

//POST router for creating user
router.post("/register", insertNewUser);

// POST router to get the user info
router.post("/login", loginUser)
// router.post("/login", (req, res) => {
//   return res.send("LOGIN ROUTE HIT");
// });

export default router;