import { useRef, useState } from 'react';
import { uploadAvatar } from "../api/visuals";
import type { ProfileProps } from "../types.ts";
import { toast } from "sonner"

const UserAvatar = ({ user, setUser } : ProfileProps) => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleClick = () => {
        return inputRef.current?.click();
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        // preview image
        const imgUrl = URL.createObjectURL(file);
        setPreview(imgUrl);

        try {
            // original file data
            const formData = new FormData();
            formData.append("avatar", file);

            // sending file to backend
            const result = await uploadAvatar(formData);
            setUser(result.updatedUser);
            toast("Profile Avatar Uploaded");
            setPreview(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (
            <div className="avatar">
                <input
                    type="file"
                    name="avatar"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    ref={inputRef}
                    onChange={handleAvatarUpload}
                />
                {
                    preview && (
                        <img
                            src={preview}
                            alt="Avatar Preview"
                            className="w-96 h-96 rounded-full"
                        />
                    )
                }
                <button onClick={handleClick} type="button">
                    {
                        // @ts-ignore
                        user?.data?.visuals?.avatar?.activeAssetId?.url? "Change Avatar" : "Add Avatar"
                    }
                </button>
            </div>
    );
};

export default UserAvatar;