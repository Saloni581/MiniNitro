import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import type { MessageCardProps } from "../../types/types.ts";

const MessageCard = ({ user, message, timestamps }: MessageCardProps) => {

    return (
        <div className="flex gap-4">
            <div>
                <UserAvatar user={user} previewEffectId="" avatarEffect={false} size="sm"/>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex gap-2 items-center">
                    <p className="font-extrabold">{user?.identity.displayName}</p>
                    <span className="text-text-secondary text-xs">
                        {timestamps}
                    </span>
                </div>
                <div className="font-light">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default MessageCard;