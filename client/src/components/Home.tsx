// import { useEffect, useState } from "react";
import { fetchALlUsers } from "../../api/user.ts";
import { useEffect, useState } from "react";
import type { UserProfileProps } from "../../types/types.ts";
import UserAvatar from "@/components/UserAvatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProfileCard from "@/components/ProfileCard.tsx";


const Home = () => {

    const [users, setUsers] = useState<UserProfileProps[]>([]);

    useEffect(() => {
        const renderALlUsers = async () => {
            const result = await fetchALlUsers();
            setUsers(result.users);
        }

        renderALlUsers();
    }, [])

    return (
        <div className="p-12">
            {users?.map((user) => (
                <div className="flex items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div>
                                <UserAvatar user={user} previewEffectId="" size="md" />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription>
                                    <div className="flex flex-col justify-center items-center">
                                        <ProfileCard user={user} />
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <div className="flex flex-col gap-4 items-center">
                        <p>{user?.identity?.displayName}</p>
                        <button className="">connect & message</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;