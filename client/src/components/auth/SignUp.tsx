import { signUp } from "../../../api/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import type { SetUserProps } from "../../../types/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/validations/auth.schema.ts";
import { cn } from "@/lib/utils.ts";

const SignUp = ({ setUser }: SetUserProps) => {
    const navigate = useNavigate();

    const userSignUp = async (data: z.infer<typeof signUpSchema>) => {
        console.log(data);
        const res = await signUp(data);
        setUser(res.data);
        navigate("/profile-form");
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
        <>
        <form
            onSubmit={form.handleSubmit(userSignUp)}
            className="auth-form"
            noValidate={true}
        >
            <div>
                <label htmlFor="userName">Enter username</label>
                <input
                    id="userName"
                    type="text"
                    placeholder="enter a unique username"
                    { ...form.register("userName")}
                    className={cn(form.formState.errors.userName && "error-input")}
                />
                {
                    form.formState.errors.userName && (
                        <p className="error-message">
                            {form.formState.errors.userName.message}
                        </p>
                    )
                }
            </div>
            <div>
                <label htmlFor="email">Enter email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="enter email address"
                    { ...form.register("email") }
                    className={cn(form.formState.errors.email && "error-input")}
                />
                {
                    form.formState.errors.email && (
                        <p className="error-message">
                            {form.formState.errors.email.message}
                        </p>
                    )
                }
            </div>
            <div>
                <label htmlFor="password">Enter password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="enter password"
                    { ...form.register("password") }
                    className={cn(form.formState.errors.password && "error-input")}
                />
                {
                    form.formState.errors.password && (
                        <p className="error-message">
                            {form.formState.errors.password.message}
                        </p>
                    )
                }
            </div>
            <button type="submit">Sign Up</button>
        </form>
        <div className="auth-div">
            <p>Already Have an account?</p>
            <div className="text-brand-primary-bold">
                <Link to="/login">
                    SignIn
                </Link>
            </div>
        </div>
        </>
    );
};

export default SignUp;