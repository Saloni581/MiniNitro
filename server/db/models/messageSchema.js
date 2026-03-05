import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: "sent",
    },
    messageType: {
        type: String,
        enum: ["text", "image", "video", "link"],
        default: "text",
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true } );

export default mongoose.model("Message", messageSchema);