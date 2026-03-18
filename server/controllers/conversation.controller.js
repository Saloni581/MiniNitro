import Conversation from "../db/models/conversationSchema.js";
import UserProfile from "../db/models/userProfileSchema.js";

export const getAllConversations = async (req, res) => {
    const userId = req.user.id;
    if(!userId) {
        return res.status(401).json({
           message:"Unauthorized",
        })
    }

    try {
        const conversations = await Conversation.find({ participants: userId });
        if(!conversations) {
            return res.status(404).json({
                message:"No conversations were Found.",
            });
        }
        const otherUserIds = conversations.map(conversation =>
            conversation.participants.find(
                participant => participant.toString() !== userId.toString()
            )
        );
        const allConversations = await UserProfile.find({ userId : { $in: otherUserIds } });
        return res.status(200).json({
            message:"Conversations successfully found!",
            conversations: allConversations,
        });

    } catch (error) {
        return res.status(500).json({
            message:"Internal Server Error.",
        })
    }
}
