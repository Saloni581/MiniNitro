import UserProfile from "../db/models/userProfileSchema.js";

export const saveAsset = async ( public_id, secure_url, userId, isAvatarAsset ) => {
    const updateQuery = isAvatarAsset? { $set: {
            "visuals.avatar.assetId.url": secure_url,
            "visuals.avatar.assetId.public_id": public_id,
        } } : { $set: {
                "visuals.profileBanner.isEnabled": true,
                "visuals.profileBanner.assetId.url": secure_url,
                "visuals.profileBanner.assetId.public_id": public_id,
            } }

    const updatedUser = await UserProfile.findOneAndUpdate(
        { userId },
        updateQuery,
        { new: true}
    );

    if(!updatedUser) {
        throw new Error("User profile does not exist");
    }
    return updatedUser;
}
