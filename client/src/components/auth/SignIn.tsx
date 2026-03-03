import { signIn } from "../../../api/auth.ts";
import { Link, useNavigate } from "react-router-dom";
import type { SetUserProps } from "../../../types/types.ts";
import { fetchUserDetails } from "../../../api/user.ts";
// @ts-ignore
import { baseAuthSchema } from "../../../../validations/auth.schema.js";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";

const SignIn = ({ setUser } : SetUserProps) => {

    const navigate = useNavigate();

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
            await signIn(data);
            const user = await fetchUserDetails();
            setUser(user.data);
            navigate("/profile");
        } catch (error) {
            console.error(error);
            toast("Error signing in user");
        }
    }

    return (
        <>
        <form
            onSubmit={form.handleSubmit(userSignIn)}
            className="auth-form"
            noValidate={true}
        >
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type='text'
                    placeholder="email"
                    className={cn(form.formState.errors.email && "error-input")}
                    { ...form.register("email") }
                    required
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
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="enter password"
                    className={cn(form.formState.errors.password && "error-input")}
                    required
                    { ...form.register("password") }
                />
                {
                    form.formState.errors.password && (
                        <p className="error-message">
                            {form.formState.errors.password.message}
                        </p>
                    )
                }
            </div>
            <button type="submit">SignIn</button>
        </form>
            <div className="auth-div">
                <p>Don't have an account?</p>
                <div className="text-brand-primary-bold">
                    <Link to="/signup">
                        SignUp
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignIn;