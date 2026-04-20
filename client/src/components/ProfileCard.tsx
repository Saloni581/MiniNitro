import type { UserProps } from "../../types/types.ts";
import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import { fonts } from "../../constants/font.ts";
import { cn } from "@/lib/utils.ts";

const ProfileCard = ({ user } : UserProps ) => {
    const fontId = user?.visuals?.displayNameStyle?.font;
    const fontStyle = fonts.find((font) => font.id === fontId);


    const bannerAsset = user?.visuals?.profileBanner?.assetId?.url;
    const bannerColor = user?.visuals?.profileBanner?.color;

    return (
        <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 relative">
                {
                    bannerAsset? (
                        <img
                            src={bannerAsset}
                            alt="User profile banner"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className={cn("absolute inset-0", !bannerColor && "bg-accent-primary")}
                            style={{ backgroundColor: bannerColor }}
                        ></div>
                    )
                }
                <div className="absolute left-10 -bottom-12">
                    <UserAvatar user={user} previewEffectId="" avatarEffect={true} showStatus={true} size="lg" />
                </div>
            </div>
            <div className="flex-2 relative">
                <div className="absolute left-14 bottom-44">
                    <div
                        className={cn("text-xl", fontStyle?.font)}
                        style={{
                            color: user?.visuals?.displayNameStyle?.color,
                        }}
                    >
                        {user?.identity?.displayName}
                    </div>
                    <span className="lowercase text-sm text-text-secondary">
                    {user?.identity?.pronouns}
                    </span>
                </div>
                <div className="">
                    {
                        user?.identity?.bio === ""?
                            "No bio" :
                            <p className="px-4 mt-40 lg:pl-10 text-xs md:text-sm lg:text-lg">
                                {user?.identity?.bio}
                            </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;