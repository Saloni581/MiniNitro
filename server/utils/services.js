import UserProfile from "../db/models/userProfileSchema.js";

export const saveUserAvatar = async ( public_id, secure_url, userId ) => {

    const userProfile = await UserProfile.findOne({ userId });

    // store previous avatar in recent assets if exists
    const recentAvatarSecure_url = userProfile?.visuals?.avatar?.activeAssetId?.url;

    let updatedUser = null;
    if(recentAvatarSecure_url) {
        updatedUser = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $set: {
                    "visuals.avatar.recentAssets": recentAvatarSecure_url,
                }
            },
            { new: true}
        );
    }

     updatedUser = await UserProfile.findOneAndUpdate(
        { userId } ,
        {
            $set: {
                "visuals.avatar.activeAssetId.url": secure_url,
                "visuals.avatar.activeAssetId.public_id": public_id,
            }
        },
        { new: true } // return updated document
    );
    if(!updatedUser) {
        throw new Error("User profile does not exist");
    }
    return updatedUser;
}
