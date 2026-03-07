import type { UserProps } from "../../types/types.ts";
import UserAvatar from "@/components/UserAvatar.tsx";

const ProfileCard = ({ user }: UserProps) => {
    const userIdentity = user?.identity;

    return (
        <>
            <UserAvatar user={user} previewEffectId="" size="lg"/>
            <div>{userIdentity?.displayName}</div>
            <div>
                    <span>
                        {user?.userId?.userName}&middot;
                    </span>
                <span>
                        {userIdentity?.pronouns}
                    </span>
            </div>
            <div>
                {
                    userIdentity?.bio === "" ?
                        "No bio" :
                        <p>
                            {userIdentity?.bio}
                        </p>
                }
            </div>
        </>
    );
};

export default ProfileCard;