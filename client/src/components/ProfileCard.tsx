import type { UserProfileProps } from "../../types/types.ts";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import { fonts } from "../../constants/font.ts";
import { cn } from "@/lib/utils.ts";

type UserProps = {
    user : UserProfileProps | null;
}

const ProfileCard = ({ user } : UserProps ) => {
    const fontId = user?.visuals.displayNameStyle.font;
    let fontStyle = null;
    if(fontId) {
       fontStyle = fonts.find((font) => font.id === fontId);
    }

    return (
        <>
            <UserAvatar user={user} previewEffectId="" size="lg" isChatWindow={false}/>
            <div className="flex items-center m-4">
                <div
                    className={cn("text-2xl", fontStyle?.font)}
                    style={{
                        color: user?.visuals.displayNameStyle.color,
                    }}
                >
                    {user?.identity?.displayName}
                </div>
                <div className="text-3xl">&middot;</div>
                <span className="lowercase text-sm">
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