export interface UserProfileProps {
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
        displayNameStyle: {
            font: string;
            color: string;
            effects: string[];
            isEnabled: boolean;
        },
        avatar: {
            activeAssetId: {
                public_id: string;
                url: string;
            },
            decorations: {
                activeEffect: string,
                ownedEffects: string[],
            }
            recentAssets: string[],
        },
        nameplate: {
            isEnabled: boolean;
            activeEffect: string;
            ownedEffects: string[],
        },
        profileDecoration: {
            isEnabled: boolean;
            activeEffect: string;
            ownedEffects: string[],
        },
        profileBanner: {
            isEnabled: boolean;
            assetId: string;
        },
        theme: {
            isEnabled: boolean;
            colors: {
                primary: string;
                accent: string;
            }
        }
    };

}

export interface GetUserResponse {
    message: string;
    data: UserProfileProps;
}

export interface User {
    userName: string;
    email: string;
}

export interface SetUserProps {
    setUser: React.Dispatch<React.SetStateAction<UserProfileProps | null>>
}

export interface UserAvatarProps {
    user: UserProfileProps | null;
    previewEffectId: string;
    size: "default" | "sm" | "md" | "lg" ;
    isChatWindow: boolean;
}

export interface ProfileProps {
    user: UserProfileProps | null;
    setUser: React.Dispatch<React.SetStateAction<UserProfileProps | null>>
}

export interface ProfileDetailsProps {
    displayName: string;
    pronouns: string;
    bio: string;
}

export interface ChatWindowProps {
    loggedInUser: UserProfileProps | null;
}

export interface SocketSendMessageProps {
    receiverId: string;
    inputMessage: string;
    messageType: any;
}

export interface MessageCardProps {
    user: UserProfileProps | null;
    message: any;
}

export interface UsersListProps {
    users: UserProfileProps[] | [];
    isMyChats: boolean;
}

export interface OnlineUsersProps {
    onlineUsers: Record<string, string>;
}