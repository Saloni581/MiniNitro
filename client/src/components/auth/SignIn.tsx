import { signIn } from "../../../api/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import type { SetUserProps } from "../../../types/types.ts";
import { fetchUserDetails } from "../../../api/user.ts";
// @ts-ignore
import { baseAuthSchema } from "../../../../validations/auth.schema.js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useContext } from "react";
import { SocketContext } from "@/components/SocketContext.tsx";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const SignIn = ({ setUser } : SetUserProps) => {

    const navigate = useNavigate();
    const connectToSocketContext = useContext(SocketContext);

    const form = useForm<z.infer<typeof baseAuthSchema>>({
        resolver: zodResolver(baseAuthSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const userSignIn = async (data: z.infer<typeof baseAuthSchema>) => {
        try {
            const res = await signIn(data);
            // if user has not created their profile
            if(res.data.incompleteAccount) {
                navigate("/profile-form");
                return;
            }
            const user = await fetchUserDetails();
            setUser(user.data);
            toast("User signed in successfully.");
            connectToSocketContext?.connectToSocket();
            navigate("/settings-panel");
        } catch (error) {
            console.error(error);
            toast("Error signing in user");
        }
    }

    return (
        <div className="flex justify-center py-12">
            <form
                onSubmit={form.handleSubmit(userSignIn)}
                noValidate={true}
                className="w-full max-w-sm md:max-w-md border-none"
            >
                <Card className="border-none md:bg-accent-dim">
                    <CardHeader>
                        <CardTitle className="font-bold text-xl md:text-2xl">Sign in to your account</CardTitle>
                        <CardDescription>
                            Enter your email and password below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="email"
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
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="password"
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
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {
                                form.formState.isSubmitting? "Signing in..." : "Sign In"
                            }
                        </Button>
                        <div className="auth-div">
                            Don't have an account?<p className="text-accent-primary"><Link to="/signup">Sign Up</Link></p>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
};

export default SignIn