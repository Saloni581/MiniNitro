import { signUp } from "../../../api/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import type { SetUserProps } from "../../../types/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// @ts-ignore
import { signUpSchema } from "../../../../validations/auth.schema.js";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardFooter
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";

const SignUp = ({ setUser }: SetUserProps) => {
    const navigate = useNavigate();

    const userSignUp = async (data: z.infer<typeof signUpSchema>) => {
        try {
            const res = await signUp(data);
            setUser(res.data);
            toast(res.message);
            navigate("/profile-form");
        } catch (error) {
            console.error(error);
            toast("Error creating user");
        }
    }

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: {
            userName: "",
            email: "",
            password: "",
        },
    });

    return (
        <div className="flex justify-center py-24">
            <form
                onSubmit={form.handleSubmit(userSignUp)}
                noValidate={true}
                className="w-full max-w-sm md:max-w-md border-none"
            >
                <Card className="border-none md:bg-accent-dim">
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="userName">Username</Label>
                                <input
                                    id="userName"
                                    type="text"
                                    placeholder="Enter a unique username"
                                    {...form.register("userName")}
                                />
                                {
                                    form.formState.errors.userName && (
                                        <p className="error-message">
                                            {form.formState.errors.userName.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    {...form.register("email")}
                                />
                                {
                                    form.formState.errors.email && (
                                        <p className="error-message">
                                            {form.formState.errors.email.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter a strong password"
                                    {...form.register("password")}
                                />
                                {
                                    form.formState.errors.password && (
                                        <p className="error-message">
                                            {form.formState.errors.password.message}
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-4">
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <div className="auth-div">
                            <p>Already have an account?</p>
                            <div className="text-accent-primary">
                                <Link to="/signin">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default SignUp;