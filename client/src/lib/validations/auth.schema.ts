import * as z from "zod";

export const baseAuthSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(10, "Password must be at most 10 characters."),
});

export const signUpSchema = baseAuthSchema.extend({
    userName: z
        .string()
        .trim()
        .min(3, "username should contain at least 3 characters."),
})