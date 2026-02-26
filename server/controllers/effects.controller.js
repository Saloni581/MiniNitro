import UserProfile from "../db/models/userProfileSchema.js";

export const modifyAvatarEffectInfo = async (req, res) => {
    const userId = req.user.id;
    const { effectId } = req.body;

    if(!userId) {
        return res.status(401).json({error: "User does not exist"});
    }

    try {

        const updatedUser = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $set: {
                    "visuals.avatar.decorations.activeEffect": effectId
                }
            },
            { new: true }
        );

        if(!updatedUser) {
            return res.status(404).json({
                message: "user profile not found"
            });
        }
        return res.status(200).json({
            message: "Successfully updated user",
            user: updatedUser
        })
    } catch (dbError) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}