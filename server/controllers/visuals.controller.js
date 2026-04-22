import cloudinary from '../config/cloudinary.js';
import { saveAsset } from "../utils/services.js";
import UserProfile from "../db/models/userProfileSchema.js";


export const uploadAsset = async (req, res) => {
    const userId = req.user.id;
    const file = req.file;
    const isAvatarAsset = req.body.isAvatarAsset === "true";

    if(!file) {
        return res.status(400).json({
            message: "File is required",
        });
    }

    try {
        // fetch user profile
        const userProfile = await UserProfile.findOne({ userId });

        if(!userProfile) {
            return res.status(404).json({
                message: 'User Profile Not Found',
            });
        }

        // upload file to cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (err, result) => {
                    if(err) return reject(err);
                    resolve(result);
                });

            stream.end(file.buffer);
        });

        // update DB
        try {
            const updatedUser = await saveAsset(
                uploadResult.public_id,
                uploadResult.secure_url,
                userId,
                isAvatarAsset
            );

            return res.status(200).json({
                message: isAvatarAsset? "Avatar uploaded successfully" : "Banner uploaded successfully",
                user: updatedUser,
            });

        } catch(dbError) {
            // cleanup of the uploaded file if db fails
            await cloudinary.uploader.destroy(uploadResult.public_id);

            return res.status(500).json({
                message: "DB avatar update failed",
            });
        }
    } catch (uploadError) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const removeAsset = async (req, res) => {
    const userId = req.user.id;
    const { isAvatarAsset } = req.body;
    const updateQuery = isAvatarAsset? { $set: { "visuals.avatar.assetId.url": "", } } :
        { $set: {
                "visuals.profileBanner.isEnabled": false,
                "visuals.profileBanner.assetId.url": "",
            } }

    try {
        const updatedUser = await UserProfile.findOneAndUpdate(
            { userId },
            updateQuery,
            { new: true }
        );

        if(!updatedUser) {
            return res.status(404).json({
                message: "User Profile Not Found",
            });
        }

        return res.status(200).json({
            message: isAvatarAsset? "User avatar removed successfully!" : "Profile banner removed successfully!",
            user: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

export const updateTheme = async (req, res) => {
    const userId = req.user.id;
    const { primary, accent } = req.body;

    const updateQuery = (primary && accent)? { $set: {
            "visuals.theme.isEnabled": true,
            "visuals.theme.colors.primary": primary,
            "visuals.theme.colors.accent": accent,
        } } : { $set: {
            "visuals.theme.isEnabled": false,
            "visuals.theme.colors.primary": null,
            "visuals.theme.colors.accent": null,
        } }

    try {
        const updatedUserProfile = await UserProfile.findOneAndUpdate(
            { userId },
            updateQuery,
            { new: true }
        );

        if(!updatedUserProfile) {
            return res.status(404).json({
                message: "user profile not found",
            });
        }

        return res.status(200).json({
            message: (primary && accent)? "Theme applied successfully!" : "Theme successfully removed!",
            user: updatedUserProfile,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const updateDisplayNameStyle = async (req, res) => {
    const userId = req.user.id;
    const { fontId, color, effect } = req.body;

    const updateQuery = (fontId || color || effect)? { $set: {
            "visuals.displayNameStyle.isEnabled": true,
            "visuals.displayNameStyle.font": fontId,
            "visuals.displayNameStyle.color": color,
            "visuals.displayNameStyle.effect": effect,
        } } : { $set: {
            "visuals.displayNameStyle.isEnabled": false,
            "visuals.displayNameStyle.font": null,
            "visuals.displayNameStyle.color": null,
            "visuals.displayNameStyle.effect": null,
        } }

    try {
       const updatedUserProfile = await UserProfile.findOneAndUpdate(
           { userId },
           updateQuery,
           { new: true }
       );

       if(!updatedUserProfile) {
           return res.status(404).json({
               message: "user profile not found",
           });
       }

       return res.status(200).json({
           message: (fontId && color)? "Display name style applied successfully!" : "Display name style removed successfully",
           user: updatedUserProfile,
       })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

export const updateBannerColor = async (req, res) => {
    const userId = req.user.id;
    const { color } = req.body;
    const updateQuery = color? { $set: { "visuals.profileBanner.color": color }} :
        { $set: { "visuals.profileBanner.color": "" }};
    try {
       const updatedUserProfile = await UserProfile.findOneAndUpdate(
           { userId },
           updateQuery,
           { new: true }
       );

       if(!updatedUserProfile) {
           return res.status(404).json({
               message: "user profile not found",
           });
       }

       return res.status(200).json({
           message: color? "Banner color applied successfully!" : "Banner color removed successfully",
           user: updatedUserProfile,
       });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}