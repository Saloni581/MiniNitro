import type { ProfileProps } from "../../types/types.ts";
import ProfileFrame from "@/components/ProfileFrame.tsx";
import ProfileCard from "@/components/ProfileCard.tsx";
import UserSettings from "@/components/UserSettings.tsx";


const UserProfile = ({ user, setUser }: ProfileProps) => {

    return (
        <div>
            <ProfileFrame user={user}>
                <ProfileCard user={user} />
            </ProfileFrame>
            <div className="absolute bottom-0 right-0">
                <UserSettings user={user} setUser={setUser}/>
            </div>
        </div>
    );
};

export default UserProfile;