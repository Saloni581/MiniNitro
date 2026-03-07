import Conversation from "../db/models/conversationSchema.js";
import Message from "../db/models/messageSchema.js";

export const getAllMessages = async (req, res) => {
        const user1 = req.user.id;
        const user2 = req.params.userId;
        try {
            const conversation = await Conversation.findOne({
                participants: {
                    $all: [user1, user2],
                }
            });

            if(!conversation) {
                return res.status(200).json([]);
            }

            const messages = await Message.find({
                room: conversation._id
            });

            return res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({
                message: "Could not find any messages."
            })
        }
}
