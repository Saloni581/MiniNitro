import { cn } from "@/lib/utils.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import type { UserAvatarProps } from "../../types/types.ts";
import { avatarEffects } from "../../constants/effectsConfig.ts";

const UserAvatar = ({ user, previewEffectId }: UserAvatarProps) => {

    const avatarUrl = user?.visuals?.avatar?.activeAssetId?.url;
    const effectId = previewEffectId || user?.visuals?.avatar?.decorations?.activeEffect;

    let activeEffect = null;
    if(effectId) {
        activeEffect = avatarEffects.find((effect) => effect.id === effectId);
    }

    return (
        <div className={cn("user-avatar", activeEffect && activeEffect?.cssClass)}>
            <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
        </div>
    );
};

export default UserAvatar;