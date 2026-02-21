import UserProfile from "../db/models/userProfileSchema.js"

export const createUserProfile = async (req, res) => {
    const { displayName, pronouns, bio } = req.body;
    const userId = req.user.id;

    if(!displayName) {
        return res.status(400).json({
            message: "Missing required parameters",
        });
    }

    if(!userId) {
        return res.status(401).json({
            message: "Unauthorized User",
        })
    }

    const existingUserProfile = await UserProfile.findById( userId );
    if(existingUserProfile) {
        return res.status(400).json({
            message: `User profile already exists`,
        });
    }

    try {
        const newProfile = await UserProfile.create({
            userId,
            identity: {
                displayName: displayName,
                    pronouns
            :
                pronouns,
                    bio
            :
                bio
            },
    });

        if(!newProfile) {
            return res.status(500).json({
                message: `Could not create user profile`,
            });
        }
        return res.status(201).json({
            message: "User profile created successfully",
            userProfile: newProfile
        });
    } catch(error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

// get user details
export const getUserData = async (req, res) => {
    const userId = req.user.id;

    try {
        const userData = await UserProfile.findOne({ userId });
        if(!userData) {
            return res.status(404).json({
                message: "No user data found!",
            });
        }
        return res.status(200).json({
            message: "User profile found",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}