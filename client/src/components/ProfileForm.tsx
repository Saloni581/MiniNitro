import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfileDetails } from "../../api/user.ts";
import type { SetUserProps } from "../../types.ts";

const ProfileForm = ({ setUser }: SetUserProps) => {

    const [displayName, setDisplayName] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();

    const handleOnboardingDetailsSubmit = async () => {
        const result = await saveProfileDetails({ displayName, pronouns, bio });
        setUser(result.userProfile);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleOnboardingDetailsSubmit();
        navigate("/profile");
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <p className="profile-form-heading">Create your profile</p>
            <div className="identity">
                <div className="identity-input">
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;