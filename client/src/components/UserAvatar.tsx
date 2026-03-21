import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import type { UserAvatarProps } from "../../types/types.ts";
import { avatarEffects } from "../../constants/effectsConfig.ts";
import { cn } from "@/lib/utils.ts";
import SmartphoneIcon from "@/assets/icons8-smartphone-48.png";
import { useContext } from "react";
import { SocketContext } from "@/components/SocketContext.tsx";

const UserAvatar = ({ user, previewEffectId, size, isChatWindow }: UserAvatarProps) => {
    const avatarUrl = user?.visuals?.avatar?.activeAssetId?.url;
    const effectId = previewEffectId || user?.visuals?.avatar?.decorations?.activeEffect;
    const socketContext = useContext(SocketContext);
    const onlineUsers = socketContext?.onlineUsers;
    const userId = user?.userId?.toString();

    let activeEffect = null;
    if(effectId) {
        activeEffect = avatarEffects.find((effect) => effect.id === effectId);
    }

    return (
        <div className="user-avatar-container">
            <div
                className={
                cn("user-avatar-inner-container",
                    (size === "sm" && "w-12 h-12"),
                    (size === "md" && "w-24 h-24"),
                    (size === "lg" && "w-32 h-32"),
                    (activeEffect && activeEffect.cssClass))
                }
            >
                <div className="user-avatar">
                    <Avatar size={`${size}`}>
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </div>
                {
                    (!previewEffectId && !isChatWindow) && (
                        // @ts-ignore
                        onlineUsers?.[userId]? (
                            <AvatarBadge>
                                <img
                                    src={SmartphoneIcon}
                                    alt="online-status-icon"
                                    className={
                                        cn((size === "sm" && "w-4 h-4"),
                                            (size === "md" && "w-8 h-8"),
                                            (size === "lg" && "w-10 h-10"))
                                    }
                                />
                            </AvatarBadge>
                            ) :
                            (
                                <AvatarBadge
                                className={
                                    cn("user-offline-status",
                                        (size === "sm" && "w-4 h-4 border-4"),
                                        (size === "md" && "w-5 h-5 border-5"),
                                        (size === "lg" && "w-6 h-6 border-6"))
                                }
                            />
                            )
                    )
                }
            </div>
        </div>
    );
};

export default UserAvatar;