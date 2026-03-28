import cloudinary from '../config/cloudinary.js';
import { saveUserAvatar } from "../utils/services.js";
import UserProfile from "../db/models/userProfileSchema.js";


export const uploadUserAvatar = async (req, res) => {
    const file = req.file;

    if(!file) {
        return res.status(400).json({
            message: "File is required",
        });
    }

    const userId = req.user.id;

    if(!userId) {
        return res.status(401).json({
            message: 'Unauthorized user',
        })
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
            const updatedUser = await saveUserAvatar(
                uploadResult.public_id,
                uploadResult.secure_url,
                userId
            );

            return res.status(200).json({
                message: "Avatar set/uploaded successfully",
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
            message: "Avatar upload failed",
        });
    }
}

export const removeUserAvatar = async (req, res) => {
    const userId = req.user.id;
    const user = await UserProfile.findOne({ userId });

    // store previous avatar in recent assets if exists
    const recentAvatarSecure_url = user?.visuals?.avatar?.activeAssetId?.url;

    if(!recentAvatarSecure_url) {
        return res.status(200).json({
            user,
            message: "There is no user avatar yet.",
        })
    }

    const updatedUser = await UserProfile.findOneAndUpdate(
        { userId },
        {
            $addToSet: {
                "visuals.avatar.recentAssets": recentAvatarSecure_url,
            },
            $unset: {
                "visuals.avatar.activeAssetId.url": "",
            }
        },
        { new: true }
    );
    return res.status(200).json({
        updatedUser,
        message: "User avatar Removed",
    });
}

export const setTheme = async (req, res) => {

}