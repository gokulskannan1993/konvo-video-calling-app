import express from 'express';
import { signup, login, logout, onboard } from '../controllers/auth.controller.js'; // Importing the auth controller functions
import { protectRoute } from '../middleware/auth.middleware.js'; // Importing the protectRoute middleware



const router = express.Router();

router.post('/signup', signup); // Route for signup
router.post('/login', login); // Route for login 
router.post('/logout', logout); // Route for logout
router.post('/onboarding', protectRoute, onboard); // Route for onboarding
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile",
        user: req.user, // Return the user object from the request
    });
}); // Route to get user profile



export default router;
// This code defines a simple Express router for authentication routes. It includes three routes: signup, login, and logout. Each route sends a response indicating which route was accessed. The router is then exported for use in other parts of the application.
