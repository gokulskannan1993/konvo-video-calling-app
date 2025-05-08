import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js'; // Importing the getStreamToken function from the chat controller


const router = express.Router(); // Create a new router instance


router.get("/", protectRoute, getStreamToken);


export default router; // Export the router for use in other parts of the application