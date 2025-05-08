import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recepient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending",
    },
}, {
    timestamps: true,
});


const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema); // Create the FriendRequest model
export default FriendRequest; // Export the FriendRequest model for use in other parts of the application