import UserAvatar from "@/components/visuals/UserAvatar.tsx";
import type { UserProfileProps, UsersListProps } from "../../types/types.ts";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils.ts";


const UsersList = ({ users, selectedUser, isChatPage, children }: UsersListProps) => {
    const navigate = useNavigate();

    const handleSelectedUser = ( selectedUserId : UserProfileProps ) => {
        navigate(`/chat/${selectedUserId.userId}`);
    }

    const showPublicProfile = (userId: string) => {
        navigate(`/profile/${userId}`);
    }

    return (
        <div className="users-list" style={{ width: isChatPage? "280px": undefined}}>
                {
                    users.length !== 0 ?
                        (users?.map((eachUser) => (
                            // nameplate effect structure
                                <div
                                    key={eachUser._id}
                                    className={
                                        cn("relative bg-accent-dim rounded-xl",
                                            selectedUser?.userId === eachUser.userId && "bg-accent-glow border-l-4 border-l-accent-primary"
                                        )
                                    }
                                >
                                    {/* glow layer */}
                                    <div className={
                                        cn("absolute z-0 inset-0 pointer-events-none",
                                        )}
                                    ></div>
                                    {/* border layer */}
                                    <div className={
                                        cn("absolute z-10 inset-0 pointer-events-none",
                                        )}
                                    ></div>
                                    {/* content layer */}
                                    <div
                                        className="user-nameplate z-20"
                                    >
                                        {/* ---- User Avatar ------ */}
                                        <div
                                            onClick={() => showPublicProfile(eachUser.userId)}
                                            className="cursor-pointer"
                                        >
                                            <UserAvatar
                                                user={eachUser}
                                                previewEffectId=""
                                                avatarEffect={true}
                                                showStatus={true}
                                                size="sm"
                                            />
                                        </div>
                                        {/* User Basic Details */}
                                        <div className="flex flex-col items-center">
                                            <p
                                                className={cn("text-sm md:text-lg font-medium",
                                                    (eachUser?.visuals?.displayNameStyle?.effect),
                                                )}
                                                style={{
                                                    color: eachUser?.visuals?.displayNameStyle?.color,
                                                    fontFamily: eachUser?.visuals?.displayNameStyle?.font
                                                }}
                                            >
                                                {eachUser?.identity?.displayName}
                                            </p>
                                            <p className="text-xs text-text-secondary">
                                                {eachUser?.identity?.pronouns}
                                            </p>
                                        </div>
                                        {/* Connect or Message Button */}
                                        <div>
                                            <div
                                                onClick={() => {
                                                    handleSelectedUser(eachUser);
                                                }}
                                            >
                                                { children }
                                            </div>
                                        </div>
                                    </div>
                                    {/* overlay layer */}
                                    <div
                                        className={
                                        cn("absolute z-30 inset-0 pointer-events-none",)
                                        }
                                    ></div>
                                </div>
                        ))): (
                            <div>Nothing to show here...</div>
                        )}
        </div>
    );
};

export default UsersList;