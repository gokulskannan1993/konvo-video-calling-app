import User from "../models/User.js"; // Import the User model for database operations
import FriendRequests from "../models/FriendRequests.js"; // Import the FriendRequests model for friend request operations
import mongoose from "mongoose"; // Import mongoose for ObjectId type checking

export async function getRecommendedUsers(req, res) {
    try {
        const userId = req.user.id; // Get the logged-in user's ID from the request object
        const currentUser = req.user; // Get the current user object from the request
        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: userId } }, // Exclude the logged-in user from recommendations
                { _id: { $nin: currentUser.friends } }, // Exclude users already in the logged-in user's friends list
                { isVerified: true }, // Only include verified users
            ]
        }) // Find users excluding the logged-in user
            .limit(10) // Limit the number of recommended users to 10
            .select("-password -__v"); // Exclude password and version fields from the result

        res.status(200).json(recommendedUsers); // Send the recommended users as a JSON response
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommended users", error }); // Handle errors and send an error response
    }
}


export async function getFriendsList(req, res) {
    try {
        const userId = req.user.id; // Get the logged-in user's ID from the request object
        const currentUser = await User.findById(userId) // Find the current user by ID
            .select("friends") // Only select the friends field
            .populate("friends", "name profilePicture nativeLanguage learningLanguage"); // Populate the friends field with user details
        res.status(200).json(currentUser.friends); // Send the friends list as a JSON response
    } catch (error) {
        console.error("Error fetching friends list:", error); // Log the error for debugging
        res.status(500).json({ message: "Error fetching friends list", error }); // Handle errors and send an error response

    }
}



export async function sendFriendRequest(req, res) {
    try {
        const { id: recepientId } = req.params; // Get the user ID from the request parameters
        const myId = req.user.id; // Get the logged-in user's ID from the request object

        if (myId === recepientId) { // Check if the user is trying to send a friend request to themselves
            return res.status(400).json({ message: "You cannot send a friend request to yourself" }); // Send an error response
        }


        const recepient = await User.findById(recepientId); // Find the recipient user by ID
        if (!recepient) { // Check if the recipient user exists
            return res.status(404).json({ message: "Recepient not found" }); // Send an error response
        }

        if (recepient.friends.includes(myId)) { // Check if the recipient is already a friend
            return res.status(400).json({ message: "You are already friends with this user" }); // Send an error response
        }


        const existingRequests = await FriendRequests.findOne({
            $or: [
                { sender: myId, recepient: recepientId }, // Check if the logged-in user has sent a request to the recipient
                { sender: recepientId, recepient: myId } // Check if the recipient has sent a request to the logged-in user
            ]
        })// Check if there are existing friend requests between the two users
        if (existingRequests) { // Check if the recipient has already sent a friend request to the logged-in user
            return res.status(400).json({ message: "Friend request already sent" }); // Send an error response
        }


        const newFriendRequest = await FriendRequests.create({ // Create a new friend request object
            sender: myId, // Set the sender to the logged-in user
            recepient: recepientId, // Set the recipient to the user ID from the request parameters
        });


        res.status(200).json({ message: "Friend request sent successfully" }); // Send a success response




    } catch (error) {
        console.error("Error sending friend request:", error); // Log the error for debugging
        res.status(500).json({ message: "Error sending friend request", error }); // Handle errors and send an error response
    }
}




export async function acceptFriendRequest(req, res) {
    try {
        const myId = req.user.id; // Get the logged-in user's ID from the request object

        const { id: requestId } = req.params; // Get the request ID from the request parameters

        const friendRequest = await FriendRequests.findById(requestId); // Find the friend request by ID


        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" }); // Send an error response if the request does not exist
        } // Check if the friend request exists


        if (friendRequest.recepient.toString() !== myId) { // Check if the logged-in user is the recipient of the request
            return res.status(403).json({ message: "You are not authorized to accept this friend request" }); // Send an error response if not authorized
        }

        friendRequest.status = "accepted"; // Update the status of the friend request to accepted
        await friendRequest.save(); // Save the updated friend request to the database


        // Add each user to the other's friends list
        await User.findByIdAndUpdate(myId, { $addToSet: { friends: friendRequest.sender } }); // Add the sender to the recipient's friends list
        await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: myId } }); // Add the recipient to the sender's friends list
        res.status(200).json({ message: "Friend request accepted successfully" }); // Send a success response


    } catch (error) {
        console.error("Error accepting friend request:", error); // Log the error for debugging
        res.status(500).json({ message: "Error accepting friend request", error }); //
    }
}




export async function getFriendRequests(req, res) {
    try {
        const myId = req.user.id; // Get the logged-in user's ID from the request object

        const incomingRequests = await FriendRequests.find({
            recepient: myId, // Find friend requests where the logged-in user is the recipient
            status: "pending" // Only include pending requests
        }).populate("sender", "name profilePicture learningLanguage nativeLanguage"); // Populate the sender field with user details


        const acceptedRequests = await FriendRequests.find({
            sender: myId, // Find friend requests where the logged-in user is the sender
            status: "accepted" // Only include accepted requests
        }).populate("recepient", "name profilePicture"); // Populate the recipient field with user details
        // Combine incoming and accepted requests into a single array   

        res.status(200).json({ incomingRequests, acceptedRequests }); // Send the friend requests as a JSON response
    } catch (error) {
        console.error("Error fetching friend requests:", error); // Log the error for debugging
        res.status(500).json({ message: "Error fetching friend requests", error }); // Handle errors and send an error response
    }
}



export async function getOutgoingFriendRequests(req, res) {
    try {
        const myId = req.user.id; // Get the logged-in user's ID from the request object

        const outgoingRequests = await FriendRequests.find({
            sender: myId, // Find friend requests where the logged-in user is the sender
            status: "pending" // Only include pending requests
        }).populate("recepient", "name profilePicture learningLanguage nativeLanguage"); // Populate the recipient field with user details


        res.status(200).json(outgoingRequests); // Send the outgoing friend requests as a JSON response
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error); // Log the error for debugging
        res.status(500).json({ message: "Error fetching outgoing friend requests", error }); // Handle errors and send an error response
    }
}
