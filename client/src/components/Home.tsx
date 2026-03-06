// import { useEffect, useState } from "react";
import { fetchALlUsers } from "../../api/user.ts";
import { useEffect, useState } from "react";
import type { UserProfileProps } from "../../types/types.ts";
import UserAvatar from "@/components/UserAvatar.tsx";


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
        <div className="p-12 bg-black">
            {users?.map((user) => (
                <div className="flex gap-4 items-center mb-4">
                    <UserAvatar user={user} previewEffectId="" size={16} />
                    <div>
                        <p>{user?.identity?.displayName}</p>
                        <button className="">connect & message</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;