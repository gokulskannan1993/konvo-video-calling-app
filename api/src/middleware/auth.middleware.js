import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library
import User from '../models/User.js'; // Import the User model



export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Get the JWT from cookies
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token' }); // If no token, return 401
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' }); // If token is invalid, return 401
        }
        const user = await User.findById(decoded.userId).select("-password"); // Find the user by ID from the token
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' }); // If user not found, return 401
        }
        req.user = user; // Attach the user to the request object

        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.log("Error in protectRoute middleware", error); // Log the error
        res.status(500).json({ message: 'Internal server error' }); // Return 500 for any other errors
    }
}