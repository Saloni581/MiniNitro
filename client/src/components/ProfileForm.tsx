import { useNavigate } from "react-router-dom";
import { saveProfileDetails } from "../../api/user.ts";
import type { SetUserProps } from "../../types/types.ts";
import { profileSchema } from "@/lib/validations/profile.schema.ts";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileForm = ({ setUser }: SetUserProps) => {
    const navigate = useNavigate();

    const handleOnboardingDetailsSubmit = async (data: z.infer<typeof profileSchema>) => {
        const result = await saveProfileDetails(data);
        setUser(result.userProfile);
        navigate("/profile");
    }

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
        defaultValues: {
            displayName: "",
            pronouns: "",
            bio: ""
        },
    });

    return (
        <form
            onSubmit={form.handleSubmit(handleOnboardingDetailsSubmit)}
            className="profile-form"
            noValidate={true}
        >
            <span className="profile-form-heading">Create your profile</span>

            <div className="identity">
                <div className="identity-input">
                    <label htmlFor="displayName">
                        Enter your display name
                    </label>
                    <input
                        id="displayName"
                        type="text"
                        { ...form.register("displayName") }
                    />
                    {
                        form.formState.errors.displayName && (
                            <p className="error-message">
                                {form.formState.errors.displayName.message}
                            </p>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="pronouns">Pronouns</label>
                    <input
                        id="pronouns"
                        type="text"
                        { ...form.register("pronouns") }
                    />
                    {
                        form.formState.errors.pronouns && (
                            <p className="error-message">
                                {form.formState.errors.pronouns.message}
                            </p>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        rows={10}
                        cols={50}
                        id="bio"
                        { ...form.register("bio") }
                    />
                    {
                        form.formState.errors.bio && (
                            <p className="error-message">
                                {form.formState.errors.bio.message}
                            </p>
                        )
                    }
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;