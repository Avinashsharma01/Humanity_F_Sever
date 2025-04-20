//  creath auth middleware hre
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import dotenv from 'dotenv';
dotenv.config();


// Middleware to verify JWT token and authenticate user
export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = await User.findById(decoded.id); // Find user by ID from token
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
// Export the middleware function
export default verifyToken;
