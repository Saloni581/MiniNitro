import UserAvatar from "@/components/UserAvatar.tsx";
import type { MessageCardProps } from "../../types/types.ts";

const MessageCard = ({ user, message }: MessageCardProps) => {

    return (
        <div className="flex gap-4">
            <div>
                <UserAvatar user={user} previewEffectId="" size="sm" />
            </div>
            <div className="flex flex-col justify-center">
                <div>
                    <p>{user?.identity.displayName}</p>
                </div>
                    <div className="font-light">
                        {message}
                    </div>
            </div>
        </div>
    );
};

export default MessageCard;