
/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createSpecialtyZodSchema } from "@/zod/specialties.validation";

//Check backend code of specialties.route.ts for identify the available routes and Here I will create function for all those available routes

export async function createSpecialty(_prevState: any, formData: FormData) {
  // check backend code of Specialties Validation to identify whats are. Also Its receive data using form as Image added

  try {
    const payload = {
      title: formData.get("title") as string,
    };

    if(zodValidator(payload, createSpecialtyZodSchema).success === false){
      return zodValidator(payload, createSpecialtyZodSchema)
    }
  
    const validatedPayload = zodValidator(payload, createSpecialtyZodSchema).data

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("/specialties", {
      body: newFormData,
    });

    const result = await response.json();

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function getSpecialties() {
  try {
    const response = await serverFetch.get("/specialties");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"? error.message: "Something went wrong"}`,
    };
  }
}

export async function deleteSpecialty(id: string) {
    try {
        const response = await serverFetch.delete(`/specialties/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

