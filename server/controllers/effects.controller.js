import UserProfile from "../db/models/userProfileSchema.js";

export const modifyAvatarEffect = async (req, res) => {
    const userId = req.user.id;
    const { effectId } = req.body;

    const updateQuery = effectId? {
            $set: { "visuals.avatar.decorations.activeEffect": effectId },
            $addToSet: { "visuals.avatar.decorations.ownedEffects": effectId },
        }
        : { $set: { "visuals.avatar.decorations.activeEffect": "" }
    };

    try {
        const updatedUser = await UserProfile.findOneAndUpdate(
            { userId },
            updateQuery,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "user profile not found"
            });
        }
        return res.status(200).json({
            message: effectId? "Avatar effect applied successfully." : "Avatar effect removed successfully.",
            user: updatedUser
        })
    } catch (dbError) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const modifyProfileEffect = async (req, res) => {
    const userId = req.user.id;
    const { effectId } = req.body;

    const updateQuery = effectId? {
            "visuals.profileDecorations.isEnabled": true,
            $set: { "visuals.profileDecoration.activeEffect": effectId },
            $addToSet: { "visuals.profileDecoration.ownedEffects": effectId },
        }
        : { $set: {
                "visuals.profileDecorations.isEnabled": true,
                "visuals.profileDecoration.activeEffect": ""
        }
    };

    try {
        const updatedUser = await UserProfile.findOneAndUpdate(
            { userId },
            updateQuery,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "user profile not found"
            });
        }
        return res.status(200).json({
            message: effectId? "Profile effect applied successfully." : "Profile effect removed successfully.",
            user: updatedUser
        })
    } catch (dbError) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

