import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import type { UserAvatarProps } from "../../types/types.ts";
import { avatarEffects } from "../../constants/effectsConfig.ts";
import { cn } from "@/lib/utils.ts";

const UserAvatar = ({ user, previewEffectId, size }: UserAvatarProps) => {

    const avatarUrl = user?.visuals?.avatar?.activeAssetId?.url;
    const effectId = previewEffectId || user?.visuals?.avatar?.decorations?.activeEffect;

    let activeEffect = null;
    if(effectId) {
        activeEffect = avatarEffects.find((effect) => effect.id === effectId);
    }

    return (
        <div className="user-avatar-container">
            <div
                className={
                cn("user-avatar-inner-container",
                    (size === "md"? "w-24 h-24": "w-32 h-32"),
                    (activeEffect && activeEffect.cssClass))
                }
            >
                <div className="user-avatar">
                    <Avatar size={`${size}`}>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;