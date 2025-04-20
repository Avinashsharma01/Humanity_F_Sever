import User from "../model/User.js";
import bcrypt from "bcrypt";
import e from "express";
import jwt from "jsonwebtoken";


// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        // Generate a token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Send response
        res.status(201).json({
            message: "User registered successfully",
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user
            = await User
                .findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Send response
        res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

// logout user
const logoutUser = async (req, res) => {
    try {
        // Invalidate the token (optional, depends on your implementation)
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}





// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id
        ).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export { registerUser, loginUser, getUserProfile };
