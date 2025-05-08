import { generateStreamToken } from "../lib/stream.js"; // Import the function to generate Stream tokens


export async function getStreamToken(req, res) {
    try {
        const token = await generateStreamToken(req.user.id); // Call the getToken function with the user ID
        res.status(200).json({ token }); // Send the token in the response
    } catch (error) {
        console.error("Error in getStreamToken controller:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error" }); // Handle errors and send an error response
    }
}