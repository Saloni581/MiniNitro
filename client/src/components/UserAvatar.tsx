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
        <div className="user-avatar">
            <div className="relative flex flex-col items-center justify-center">
                <div className="z-1">
                    <Avatar size={`${size}`} className={cn(activeEffect && activeEffect.cssClass)}>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>
                <div className="absolute">
                    {activeEffect && (
                        <activeEffect.component />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserAvatar;