export interface UserProfile {
    _id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    identity: {
        displayName: string;
        pronouns: string;
        bio: string;
    };
    premium: {
        isActive: boolean;
    };
    visuals: {
        avatar: {
            activeAssetId: {
                public_id: string;
                url: string;
            },
            recentAssets: [],
        }
    };
}

export interface GetUserResponse {
    message: string;
    data: UserProfile;
}

export interface User {
    userName: string;
    email: string;
}

export interface SetUserProps {
    setUser: React.Dispatch<React.SetStateAction<GetUserResponse | null>>
}

export interface NavbarProps {
    user: GetUserResponse | null;
}

export interface ProfileProps {
    user: GetUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<GetUserResponse | null>>
}

export interface ProfileDetailsProps {
    displayName: string;
    pronouns: string;
    bio: string;
}
