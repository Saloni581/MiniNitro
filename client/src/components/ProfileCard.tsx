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
        <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 bg-red-300 relative">
                <div className="absolute left-10 -bottom-12">
                    <UserAvatar user={user} previewEffectId="" size="lg" />
                </div>
            </div>
            <div className="flex-2 flex flex-col justify-center gap-8 m-6">
                <div className="flex flex-col gap-2">
                    <div
                        className={cn("text-xl", fontStyle?.font)}
                        style={{
                            color: user?.visuals.displayNameStyle.color,
                        }}
                    >
                        {user?.identity?.displayName}
                    </div>
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
            </div>
        </div>
    );
};

export default ProfileCard;