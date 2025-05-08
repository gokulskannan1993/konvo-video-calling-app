import "dotenv/config"; // Automatically loads environment variables from .env file
import express from "express"; // Importing express framework
import authRoutes from "./routes/auth.route.js"; // Importing the auth routes
import connectDB from "./lib/db.js"; // Importing the database connection function
import cookieParser from "cookie-parser"; // Importing cookie-parser middleware
import userRoutes from "./routes/user.route.js"; // Importing the user routes
import chatRoutes from "./routes/chat.route.js"; // Importing the chat routes
import cors from "cors"; // Importing CORS middleware
import path from "path"; // Importing path module for handling file paths

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

const __dirname = path.resolve(); // Get the current directory name
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../ui/dist"))); // Serve static files from the public directory
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../ui", "dist", "index.html")); // Serve index.html for all other routes
  });
}

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // Enable CORS for the client URL
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(express.json()); // Use express.json() middleware to parse JSON request bodies
app.use("/api/auth", authRoutes); // Use the auth routes under the /api/auth path
app.use("/api/users", userRoutes); // Use the user routes under the /api/users path
app.use("/api/chat", chatRoutes); // Use the chat routes under the /api/chat path

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB(); // Connect to the database when the server starts
});
