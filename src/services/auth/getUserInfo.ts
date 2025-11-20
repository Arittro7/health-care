/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { UserInfo } from "@/types/User.interface";
import { getCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      return null 
    }

    const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload

    if(!verifiedToken){
      return null
    }

    const userInfo: UserInfo = {
      email: verifiedToken.email,
      role: verifiedToken.role
    }

    return userInfo
  } catch (error: any) {
    console.log(error);
    return null
  }
};

/* ----------1
1. As It is a async function I will get Promise which will provide user Info
2. For User Info I will declare types on 📂src\types\User.interface.ts & Dashboard.interface.ts
  2.1 Define user interface and set as Promise
  2.2 I may not get user info thats why I will pass a null 
3. Call the getCookie function and destructure the accessToken, also through error on failed get access token, Apply try-catch block
4. I will check using jwt 
5. Return userInfo using verifiedToken 
please write in-depth explanation for 4,5 

6. Now I will call this function on DashboardNavbar.tsx
*/