import { useRef, useState } from 'react';
import { uploadAvatar } from "../api/visuals";

const UserAvatar = () => {

    const inputRef = useRef(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleClick = () => {
        // @ts-ignore
        return inputRef.current.click();
    }

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        // preview image
        const imgUrl = URL.createObjectURL(file);
        setPreview(imgUrl);

        // original file data
        const formData = new FormData();
        formData.append("avatar", file);

        // sending file to backend
        const result = await uploadAvatar(formData);
        console.log(result);
    }

    return (
        <div className="visuals">
            <div className="avatar">
                <label htmlFor="avatar">Avatar</label>
                <input
                    type="file"
                    id="avatar"
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
                        preview? "Change Avatar" : "Add Avatar"
                    }
                </button>
            </div>
        </div>
    );
};

export default UserAvatar;