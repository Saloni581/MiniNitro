import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfileDetails } from "../api/user.ts";
import { uploadAvatar } from "../api/visuals.ts";

const ProfileForm = () => {

    const inputRef = useRef(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    const handleOnboardingDetailsSubmit = async () => {
        const result = await saveProfileDetails({ displayName, pronouns, bio });
        console.log(result);
    }

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleOnboardingDetailsSubmit();
        navigate("/profile");
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="identity">
                <div>
                    <label htmlFor="displayName">Enter your display Name</label>
                    <input type="text" name="displayName" id="displayName" onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="pronouns">Pronouns</label>
                    <input type="text" name="pronouns" id="pronouns" onChange={(e) => setPronouns(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea rows={10} cols={50} id="bio" name="bio" onChange={(e) => setBio(e.target.value)} />
                </div>
            </div>
            <div className="visuals">
                <div className="avatar">
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" id="avatar" className="hidden" ref={inputRef} onChange={handleAvatarUpload}/>
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;