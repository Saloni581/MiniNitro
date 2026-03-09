import type { UserProfileProps } from "../../types/types.ts";
import UserAvatar from "@/components/UserAvatar.tsx";

type UserProps = {
    user : UserProfileProps | null;
}

const ProfileCard = ({ user } : UserProps ) => {

    return (
        <>
            <UserAvatar user={user} previewEffectId="" size="lg"/>
            <div>{user?.identity?.displayName}</div>
            <div>
                <span>
                        {user?.identity?.pronouns}
                    </span>
            </div>
            <div>
                {
                    user?.identity?.bio === "" ?
                        "No bio" :
                        <p>
                            {user?.identity?.bio}
                        </p>
                }
            </div>
        </>
    );
};

export default ProfileCard;