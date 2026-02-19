import cloudinary from '../config/cloudinary.js';
import UserProfile from "../db/models/userProfileSchema.js";


export const uploadUserAvatar = async (req, res) => {
    const file = req.file;
    if(!file) {
        return res.status(400).json({
            message: "File is required",
        });
    }

    const userId = req.user.userId;
    if(!userId) {
        return res.status(401).json({
            message: 'Unauthorized',
        })
    }
    try {
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

        // fetch user
        const userProfile = await UserProfile.findById({ userId });

        if(!userProfile) {
            // cleanup the uploaded file if user does not exist
            await cloudinary.uploader.destroy(uploadResult.public_id);

            return res.status(404).json({
                message: 'User Profile Not Found',
            })
        }

        // store public_id for later use if exists
        const oldPublic_id = userProfile?.visuals?.avatar?.avatarAssetId?.public_id;

        // update DB
        try {

        } catch(dbError) {

        }
    } catch (uploadError) {
        return res.status(500).json({
            message: "Avatar upload failed",
        });
    }
}