/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod"

const loginValidationZodSchema = z.object({
  email: z.email({
    error: "Email is required",

  }),
  password: z.string()
  .nonempty("Password is required")
  .min(6,{
    error: "Password must contain at least 6 character"
  }).max(100,{
    error: "Password can't exceed 100 character"
  })
})

export const loginUser = async(_currentState: any, formData:any) :Promise<any> =>{
 try {

  const loginData = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const validatedFields = loginValidationZodSchema.safeParse(loginData)
  
  if(!validatedFields.success){
    return{
      success: false,
      errors: validatedFields.error.issues.map(issue =>{
        return {
          field: issue.path[0],
          message: issue.message
        }
      })
    }
  }

  console.log(validatedFields);

  const res = await fetch("http://localhost:5000/api/v1/auth/login",
    {
      method: "POST",
      body: JSON.stringify(loginData),
      headers:{
         "Content-Type": "application/json",
      },
    }
  ).then(res => res.json())

  return res

 } catch (error) {
  console.log(error);
  return{error: "Login Failed"}
 } 
}