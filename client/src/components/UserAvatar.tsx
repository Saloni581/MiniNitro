import { cn } from "@/lib/utils.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import type { UserProps } from "../../types/types.ts";
import { avatarEffects } from "../../constants/effectsConfig.ts";

const UserAvatar = ({ user }: UserProps) => {

    const avatarUrl = user?.visuals?.avatar?.activeAssetId?.url;
    const effectId = user?.visuals?.avatar?.decorations?.activeEffect;

    let activeEffect = null;
    if(effectId) {
        activeEffect = avatarEffects.find((effect) => effect.id === effectId);
    }

    const OverlayComponent = activeEffect && activeEffect?.component;

    return (
        <div className={cn("user-avatar", activeEffect && activeEffect?.cssClass)}>
            <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            {
                OverlayComponent && (
                    <OverlayComponent />
                )
            }
        </div>
    );
};

export default UserAvatar;