import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

const ProfileForm = () => {

    const inputRef = useRef(null);
    const [preview, setPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleClick = () => {
        // @ts-ignore
        return inputRef.current.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        const imgUrl = URL.createObjectURL(file);
        setPreview(imgUrl);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/profile");
    }

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="identity">
                <div>
                    <label htmlFor="displayName">Enter your display Name</label>
                    <input type="text" id="displayName"/>
                </div>
                <div>
                    <label htmlFor="pronouns">Pronouns</label>
                    <input type="text" id="pronouns"/>
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea rows={10} cols={50} id="bio"/>
                </div>
            </div>
            <div className="visuals">
                <div className="avatar">
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" id="avatar" className="hidden" ref={inputRef} onChange={handleFileChange}/>
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