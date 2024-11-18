import { z } from 'zod';

export const AuthSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string()
        .superRefine((val, ctx) => {
            if (val.length < 8) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_small,
                    type: "string", // This indicates that the validation applies to a string type.
                    minimum: 8,
                    inclusive: true, // This means a string of 8 characters is valid
                    message: "Password must be 8 characters long",
                })
                return z.NEVER;
            };
            if (val.length > 32) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_big,
                    type: "string",
                    maximum: 32,
                    inclusive: true,
                    message: "Password cannot be more than 32 characters long"
                })
            }
            if (!/[A-Z]/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one uppercase letter",
                })
                return z.NEVER;
            };
            if (!/[a-z]/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one lowercase letter",
                })
                return z.NEVER;
            };
            if (!/\d/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one number",
                })
            };
            if (!/[!@#$%^&*(),.?":{}|<>_]/.test(val)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Password must contain at least one special character",
                })
            }
        })
});