import { useNavigate } from "react-router-dom";
import { saveProfileDetails } from "../../api/user.ts";
import type { SetUserProps } from "../../types/types.ts";
import { profileSchema } from "../../validations/profile.schema.ts";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";

const ProfileForm = ({ setUser }: SetUserProps) => {
    const navigate = useNavigate();

    const handleProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
        try {
            const result = await saveProfileDetails(data);
            setUser(result.userProfile);
            toast(result.message);
            navigate("/profile");
        } catch (error) {
            console.error(error);
            toast("Failed to save profile details");
        }
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
        <div className="flex justify-center py-6">
            <form
                onSubmit={form.handleSubmit(handleProfileSubmit)}
                noValidate={true}
                className="w-full max-w-sm md:max-w-md border-none"
            >
                <Card className="border-none md:bg-accent-dim">
                    <CardHeader>
                        <CardTitle className="font-bold text-xl md:text-2xl">Create your profile</CardTitle>
                        <CardDescription>
                            Enter these basic details to create your profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="displayName">Display Name</Label>
                                <input
                                    id="displayName"
                                    type="text"
                                    placeholder="Enter display name"
                                    {...form.register("displayName")}
                                />
                                {
                                    form.formState.errors.displayName && (
                                        <p className="error-message">
                                            {form.formState.errors.displayName.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="pronouns">Pronouns</Label>
                                </div>
                                <input
                                    id="pronouns"
                                    type="text"
                                    placeholder="she/her, he/him, they/them"
                                    {...form.register("pronouns")}
                                />
                                {
                                    form.formState.errors.pronouns && (
                                        <p className="error-message">
                                            {form.formState.errors.pronouns.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="bio">Bio</Label>
                                </div>
                                <textarea
                                    id="bio"
                                    rows={5}
                                    placeholder="Your bio..."
                                    {...form.register("bio")}
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
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {
                                form.formState.isSubmitting? "Creating your profile..." : "Create Profile"
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default ProfileForm;