import * as z from "zod";

export const profileSchema = z.object({
    displayName: z
        .string()
        .trim()
        .max(20, "Display Name should not exceed 20 characters."),
    pronouns: z
        .string()
        .max(10, "Pronouns should not exceed 10 characters."),
    bio: z
        .string()
        .trim()
        .max(250, "Bio should not exceed 250 characters."),
});

