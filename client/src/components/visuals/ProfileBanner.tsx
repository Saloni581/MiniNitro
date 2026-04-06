import { useRef, useState } from "react";
import { removeProfileBannerColor, updateProfileBannerColor, uploadAsset } from "../../../api/visuals.ts";
import {toast} from "sonner";
import type { ProfileProps } from "../../../types/types.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { HexColorPicker } from "react-colorful";

const ProfileBanner = ({ user, setUser }: ProfileProps) => {
    const currentBannerColor = user?.visuals?.profileBanner?.color ?? "";
    const bannerInputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [color, setColor] = useState(currentBannerColor);

    const handleClick = () => {
        return bannerInputRef.current?.click();
    }

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const result = await uploadAsset({ formData, isAvatarAsset: false });
            console.log(result);
            setUser(result.user);
            toast(result.message);
            setPreview(null);
        } catch (error) {
            console.log(error);
            toast("Something went wrong!");
        }
    }

    const handleSaveProfileBannerColor = async () => {
        const res = await updateProfileBannerColor({ color : color });
        setUser(res.user);
        toast(res.message);
    }

    const handleRemoveProfileBannerColor = async () => {
        const res = await removeProfileBannerColor();
        setUser(res.user);
        toast(res.message);
    }

    return (
        <div>
            <p className="text-lg text-text-primary">Profile banner</p>
            <div>
                <p>Pick banner background color</p>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex gap-2 items-center">
                            <p>Color</p>
                            <Button
                                variant="outline"
                                style={{ backgroundColor: color }}
                                className="w-12 flex justify-end">
                            </Button>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <HexColorPicker color={color} onChange={setColor} />
                    </PopoverContent>
                </Popover>
                <div>
                    <Button onClick={handleSaveProfileBannerColor}>save</Button>
                    <Button onClick={handleRemoveProfileBannerColor}>remove</Button>
                </div>
            </div>
            {/* banner upload input */}
            <div className="avatar">
                <input
                    type="file"
                    name="asset"
                    className="hidden"
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    ref={bannerInputRef}
                    onChange={handleBannerUpload}
                />
                {
                    preview && (
                        <img
                            src={preview}
                            alt="Banner Preview"
                            className=""
                        />
                    )
                }
                <button onClick={handleClick} type="button">
                    {
                        user?.visuals?.profileBanner?.assetId?.url? "Change banner" : "Add banner"
                    }
                </button>
            </div>
        </div>
    );
};

export default ProfileBanner;