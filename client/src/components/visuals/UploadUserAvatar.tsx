import { useRef, useState } from 'react';
import { uploadAvatar } from "../../../api/visuals.ts";
import type { ProfileProps } from "../../../types/types.ts";
import { toast } from "sonner"

const UploadUserAvatar = ({ user, setUser } : ProfileProps) => {

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
            formData.append("asset", file);

            // sending file to backend
            const result = await uploadAvatar({ formData, isAvatarAsset: true });
            setUser(result.user);
            toast("Profile Avatar Uploaded");
            setPreview(null);
        } catch (error) {
            console.log(error);
            toast("Something went wrong!");
        }
    }

    return (
            <div className="avatar">
                <input
                    type="file"
                    name="asset"
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
                        user?.visuals?.avatar?.assetId?.url? "Change avatar" : "Add avatar"
                    }
                </button>
            </div>
    );
};

export default UploadUserAvatar;