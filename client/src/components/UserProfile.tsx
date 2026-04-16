import type { UserProps } from "../../types/types.ts";
import ProfileFrame from "@/components/ProfileFrame.tsx";
import ProfileCard from "@/components/ProfileCard.tsx";


const UserProfile = ({ user }: UserProps) => {

    return (
        <div>
            <ProfileFrame user={user} >
                <ProfileCard user={user} />
            </ProfileFrame>
        </div>
    );
};

export default UserProfile;