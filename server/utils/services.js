import UserProfile from "../db/models/userProfileSchema.js";

export const saveUserAvatar = async ( public_id, secure_url, userId ) => {
    const updatedUser = await UserProfile.findOneAndUpdate(
        { userId },
        {
            $set: {
                "visuals.avatar.activeAssetId.url": secure_url,
                "visuals.avatar.activeAssetId.public_id": public_id,
            }},
        { new: true } // return updated document
    );
    if(!updatedUser) {
        throw new Error("User profile does not exist"+ userProfile);
    }
    return updatedUser;
}
