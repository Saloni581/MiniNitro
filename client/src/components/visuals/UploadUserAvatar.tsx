import { useRef, useState } from 'react';
import { uploadAsset } from "../../../api/visuals.ts";
import type { ProfileProps } from "../../../types/types.ts";
import { toast } from "sonner";
import {Button} from "@/components/ui/button.tsx";

const UploadUserAvatar = ({ user, setUser } : ProfileProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

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
            setLoading(true);
            // original file data
            const formData = new FormData();
            formData.append("asset", file);

            // sending file to backend
            const result = await uploadAsset({ formData, isAvatarAsset: true });
            setUser(result.user);
            toast("Profile Avatar Uploaded");
            setPreview(null);
            setLoading(false);
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
                            className="w-50 h-50 rounded-full"
                        />
                    )
                }
                {
                    loading && <p>Uploading avatar...</p>
                }
                <Button onClick={handleClick} className="btn-primary" disabled={loading}>
                    {
                        user?.visuals?.avatar?.assetId?.url? "Change avatar" : "Add avatar"
                    }
                </Button>
            </div>
    );
};

export default UploadUserAvatar;