import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import type { MessageCardProps } from "../../types/types.ts";
import { cn } from "@/lib/utils.ts";

const MessageCard = ({ user, message, timestamps, loggedInUserId }: MessageCardProps) => {

    const isMineMessage = message?.sender === loggedInUserId;

    return (
        <div className={
                cn("flex gap-2 items-start",
                isMineMessage? "self-start flex-row" : "self-end flex-row-reverse")
        }>
            <div className="shrink-0 self-start">
                <UserAvatar user={user} previewEffectId="" avatarEffect={false} size="sm"/>
            </div>
            <div className={
                cn("flex flex-col justify-center p-4 rounded-2xl",
                    isMineMessage ? "bg-accent-glow" : "bg-accent-dim"
                )}
            >
                <div className="flex gap-2 items-center">
                    <p className="font-extrabold">{user?.identity.displayName}</p>
                    <span className="text-text-secondary text-xs">
                        {timestamps}
                    </span>
                </div>
                <div className="font-light">
                    {message?.message}
                </div>
            </div>
        </div>
    );
};

export default MessageCard;