/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IDoctor } from "@/types/doctor.interface";
import { createDoctorZodSchema, updateDoctorZodSchema } from "@/zod/doctors.validation";

export async function createDoctor(_prevState: any, formData: FormData) {
    try {
        const payload: IDoctor = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            contactNumber: formData.get("contactNumber") as string,
            address: formData.get("address") as string,
            registrationNumber: formData.get("registrationNumber") as string,
            experience: Number(formData.get("experience") as string
            ),
            gender: formData.get("gender") as "MALE" | "FEMALE",
            appointmentFee: Number(formData.get("appointmentFee") as string),
            qualification: formData.get("qualification") as string,
            currentWorkingPlace: formData.get("currentWorkingPlace") as string,
            designation: formData.get("designation") as string,
            password: formData.get("password") as string,
        }
        if (zodValidator(payload, createDoctorZodSchema).success === false) {
            return zodValidator(payload, createDoctorZodSchema);
        }

        const validatedPayload = zodValidator(payload, createDoctorZodSchema).data;

        if (!validatedPayload) {
            throw new Error("Invalid payload");
        }

        const newPayload = {
            password: validatedPayload.password,
            doctor: {
                name: validatedPayload.name,
                email: validatedPayload.email,
                contactNumber: validatedPayload.contactNumber,
                address: validatedPayload.address,
                registrationNumber: validatedPayload.registrationNumber,
                experience: validatedPayload.experience,
                gender: validatedPayload.gender,
                appointmentFee: validatedPayload.appointmentFee,
                qualification: validatedPayload.qualification,
                currentWorkingPlace: validatedPayload.currentWorkingPlace,
                designation: validatedPayload.designation,
            }
        }
        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(newPayload))

        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob)
        }

        const response = await serverFetch.post("/user/create-doctor", {
            body: newFormData,
        })

        const result = await response.json();


        return result;
    } catch (error: any) {
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` }

    }
}

export async function getDoctors(queryString?: string) {
    try {
        const response = await serverFetch.get(`/doctor${queryString ? `?${queryString}` : ""}`);
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

export async function getDoctorById(id: string) {
    try {
        const response = await serverFetch.get(`/doctor/${id}`)
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

export async function updateDoctor(id: string, _prevState: any, formData: FormData) {
    try {
        const payload: Partial<IDoctor> = {
            name: formData.get("name") as string,
            contactNumber: formData.get("contactNumber") as string,
            address: formData.get("address") as string,
            registrationNumber: formData.get("registrationNumber") as string,
            experience: Number(formData.get("experience") as string),
            gender: formData.get("gender") as "MALE" | "FEMALE",
            appointmentFee: Number(formData.get("appointmentFee") as string),
            qualification: formData.get("qualification") as string,
            currentWorkingPlace: formData.get("currentWorkingPlace") as string,
            designation: formData.get("designation") as string,
        }
        const validatedPayload = zodValidator(payload, updateDoctorZodSchema).data;

        const response = await serverFetch.patch(`/doctor/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(validatedPayload),
        })
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` }
    }
}

export async function softDeleteDoctor(id: string) {
    try {
        const response = await serverFetch.delete(`/doctor/soft/${id}`)
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
export async function deleteDoctor(id: string) {
    try {
        const response = await serverFetch.delete(`/doctor/${id}`)
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


/*
1. After Defining the ZOD schema for Doctor Now I can start coding the Doctor Management Server
2. Add "use server"
3. Mainly I need to create 5 server action function 3 of are write operation [create, update, delete] and rest of 2 [getAllDoctor, getDoctorById] are get operation. 
------------
4. function createDoctor ---🚩 
  a. 1st I'm getting the payload from formData
  b. The I will validate the payload using zodValidator
  c. Throw error on Invalid Payload
  d. Define New Payload as Image will be taken. [newPayload will be like of createDoctor function from user.validation.ts file of backend]
  e. @5:55 Append the newPayload object into newFormData on data field as Stringify
  f. Then I will check and Append file if exist
  g. Then I will call the server fetch and send the newFormData in body
------------
5. function getDoctors ---🚩
  a. I will define a queryString for search query
  b. Bring all the doctor using server fetch along with query string
------------
and so on... 
*/