import UserProfile from "../db/models/userProfileSchema.js"

export const createUserProfile = async (req, res) => {
    const { displayName, pronouns, bio } = req.body;
    const userId = req.user.id;

    const existingUserProfile = await UserProfile.findById( userId );

    if(existingUserProfile) {
        return res.status(400).json({
            message: `User profile already exists`,
            userProfile: existingUserProfile,
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

export const updateUserProfile = async (req, res) => {
    const { displayName, pronouns, bio } = req.body;
    const userId = req.user.id;

    try {
        const updatedUserProfile = await UserProfile.findOneAndUpdate(
            { userId },
            {
                $set: {
                    "identity.displayName": displayName,
                    "identity.pronouns": pronouns,
                    "identity.bio": bio
                }
            },
            { new: true }
        );

        if(!updatedUserProfile) {
            return res.status(400).json({
                message: "User profile not found",
            });
        }

        return res.status(200).json({
            userProfile: updatedUserProfile,
            message: "User profile updated successfully",
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

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserProfile.find();
        return res.status(200).json({
            users: allUsers,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const getUserById = async (req, res) => {
    const { userId } = req.params;
    if(!userId) {
        return res.status(404).json({
            message: "No user found with id.",
        });
    }

    try {
        const userData = await UserProfile.findOne({ userId });
        if(!userData) {
            return res.status(404).json({
                message: "No user data found.",
            });
        }

        return res.status(200).json({
            message: "User profile found successfully!",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}