import { fetchUserById } from "../../api/user.ts";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { UserProfileProps } from "../../types/types.ts";
import ProfileFrame from "@/components/ProfileFrame.tsx";

const PublicProfile = () => {
    const { userId } = useParams();
    const [profileUser, setProfileUser] = useState<UserProfileProps | null>(null);

    useEffect(() => {
        const userProfile = async () => {
            const user = userId? await fetchUserById(userId) : null;
            setProfileUser(user.data);
        }
        userProfile();
    }, [userId]);

    if(!profileUser) {
        return <div>Loading....</div>;
    }

    return (
        <ProfileFrame  user={profileUser} />
    );
};

export default PublicProfile;