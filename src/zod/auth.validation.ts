/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string() ,
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, {
        error: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error:
        "Confirm Password is required and must be at least 6 characters long",
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],//as the refine done out side of z.obj that's why I have to use path to marked the target refined field
  });

  export const loginValidationZodSchema = z.object({
  email: z.email({
    error: "Email is required",
  }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, {
      error: "Password must contain at least 6 character",
    })
    .max(100, {
      error: "Password can't exceed 100 character",
    }),
});
