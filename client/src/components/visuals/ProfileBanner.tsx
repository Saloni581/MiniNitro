import { useRef, useState } from "react";
import {removeAsset, removeProfileBannerColor, updateProfileBannerColor, uploadAsset} from "../../../api/visuals.ts";
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
    const [loading, setLoading] = useState<boolean>(false);

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
            setLoading(true);
            // original file data
            const formData = new FormData();
            formData.append("asset", file);

            // sending file to backend
            const result = await uploadAsset({ formData, isAvatarAsset: false });
            console.log(result);
            setUser(result.user);
            toast(result.message);
            setPreview(null);
            setLoading(false);
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

    const handleRemoveProfileBanner = async () => {
        const res = await removeAsset({ isAvatarAsset: false });
        setUser(res.user);
        toast(res.message);
    }

    return (
        <div>
            <div className="flex flex-col gap-2 py-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex gap-2 items-center">
                            <p className="options-heading">Banner color</p>
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
                <div className="flex gap-2">
                    <Button onClick={handleSaveProfileBannerColor} className="btn-primary">
                        Save color
                    </Button>
                    <Button onClick={handleRemoveProfileBannerColor} className="btn-ghost">
                        Remove color
                    </Button>
                </div>
            </div>
            {/* banner asset upload input */}
            <div className="avatar flex flex-col gap-2">
                <p className="options-heading">Banner image/gif</p>
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
                            className="w-50 h-50"
                        />
                    )
                }
                {
                    loading && <p>Uploading banner...</p>
                }
                <div className="flex gap-2">
                    <Button onClick={handleClick} className="btn-primary" disabled={loading}>
                        {
                            user?.visuals?.profileBanner?.assetId?.url? "Change banner" : "Add banner"
                        }
                    </Button>
                    <Button onClick={handleRemoveProfileBanner} className="btn-ghost">
                        Remove banner
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ProfileBanner;