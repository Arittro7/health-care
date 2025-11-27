/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

const registerValidationZodSchema = z
  .object({
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

export const registerPatient = async (_currentState: any,formData: any): Promise<any> => {
  try {
    const payload = { // ❌validationData ✅payload
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if(zodValidator(payload, registerValidationZodSchema).success === false){
      return zodValidator(payload, registerValidationZodSchema)
    }

    const validatedPayload : any = zodValidator(payload, registerValidationZodSchema).data

    const registerData = {
      password: validatedPayload.password,
      patient: {
        name: validatedPayload.name,
        email: validatedPayload.email,
        address: validatedPayload.address,
      },
    };

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));

    // check it
    if(formData.get("file")){
      newFormData.append("file", formData.get("file")as Blob)
    }

    const res = await serverFetch.post("http://localhost:5000/api/v1/user/create-patient",
      {
        body:newFormData
      }
    )
    const result = await res.json()

    console.log(res, "res");

    if(result.success){
      await loginUser(_currentState, formData) 
    }

    return result;

    // add error digest to handle next redirect

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return { success: false, message: `${process.env.NODE_ENV === "development" ? error.message : "Login Failed. Please provide valid email & password"}`};
  }
};

