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
        <div className={
            cn("h-30 w-30 relative rounded-full",
                (size === "sm" && "w-10 h-10"),
                (size === "md" && "w-20 h-20"),
            )
        }
        >
            {/* glow layer */}
            <div className={
                cn("absolute z-0 inset-0",
                    (activeEffect && activeEffect.cssGlowClass),
                    (size === "sm" && "-inset-2"),
                    (size === "md" && "-inset-4"),
                    (size === "lg" && "-inset-6"),
                )
            }
            ></div>
            {/* border layer */}
            <div className={
                cn("absolute z-10 inset-0 rounded-full",
                    (activeEffect && activeEffect.cssBorderClass),
                    (size === "sm" && "-inset-0.5"),
                    (size === "md" && "-inset-1"),
                    (size === "lg" && "-inset-1"),
                )
            }
            ></div>
             {/*avatar image layer */}
            <div className="absolute rounded-full inset-0 z-20">
                <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="absolute rounded-full">Avatar</AvatarFallback>
                </Avatar>
            </div>
             {/*overlay layer */}
            {/*<div className={*/}
            {/*    cn("absolute z-30 inset-0",*/}
            {/*        (size === "sm" && ""),*/}
            {/*        (size === "md" && ""),*/}
            {/*        (size === "lg" && ""),*/}
            {/*    )*/}
            {/*}*/}
            {/*>*/}
            {/*</div>*/}
            {/* status badge layer */}
            <div className="absolute inset-0 z-40">
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
                                                (size === "md" && "w-6 h-6"),
                                                (size === "lg" && "w-7 h-7"))
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