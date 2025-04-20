import { registerUser, loginUser, getUserProfile } from '../controllers/UserController.js';
import express from 'express';

import { verifyToken } from '../middleware/auth.js';
import e from 'express';
const router = express.Router();

// router.get("/user", verifyToken, Usercontroller.getUser)
router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/getuser", verifyToken, getUserProfile);

export default router;