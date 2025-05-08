import { StreamChat } from "stream-chat";
import "dotenv/config"; // Load environment variables from .env file


const apiKey = process.env.STREAM_API_KEY; // Get the API key from environment variables
const apiSecret = process.env.STREAM_API_SECRET; // Get the API secret from environment variables

if (!apiKey || !apiSecret) {
    throw new Error("STREAM_API_KEY and STREAM_API_SECRET must be set in .env file");
} // Check if API key and secret are set
// Initialize StreamChat client with API key and secret 


const streamClient = StreamChat.getInstance(apiKey, apiSecret); // Create a StreamChat instance


// Function to upsert a user in StreamChat
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]); // Upsert the user in StreamChat
        return userData;
    } catch (error) {
        console.error("Error upserting user in Stream:", error);
        throw error;
    }
};


// Function to generate a token for a user
export const generateStreamToken = (userId) => {

    try {
        const token = streamClient.createToken(userId.toString()); // Generate a token for the user
        return token; // Return the generated token
    } catch (error) {
        console.error("Error generating Stream token:", error); // Log the error for debugging
        throw error; // Throw the error to be handled by the calling function
    }

}

