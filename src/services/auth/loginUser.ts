/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import z from "zod";
import { setCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";



export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    // console.log("redirect from server action",redirect);

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if(zodValidator(payload, loginValidationZodSchema).success === false){
      return zodValidator(payload, loginValidationZodSchema)
    }

    const validatedPayload = zodValidator(payload, loginValidationZodSchema).data

    const res = await serverFetch.post("/auth/login", {
      // body: JSON.stringify(loginData)
      body: JSON.stringify(validatedPayload),
      headers:{
        "Content-Type":"application/json"
      }
    });

    const result = await res.json()

    const setCookieHeaders = res.headers.getSetCookie();

    // I will check the cookie
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        console.log("For Each Cookie", cookie);
        // convert into obj
        const parseCookie = parse(cookie);
        console.log("Oi mama ParsedCookie", parseCookie);

        if (parseCookie["accessToken"]) {
          accessTokenObject = parseCookie;
        }
        if (parseCookie["refreshToken"]) {
          refreshTokenObject = parseCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    console.log({
      accessTokenObject,
      refreshTokenObject,
    });

    if (!accessTokenObject) {
      throw new Error("Token not found in Cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Token not found in Cookies");
    }

    // set the cookies [cookies from next/headers]
    // const cookieStore = await cookies(); remove with tokenHandler file
    // replace cookieStore with setCookie from tokenHandler and add await
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60, //maxAge number from my backend
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90, //maxAge number from my backend
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    console.log(setCookieHeaders, "setCookie");

    console.log({
      res,
    });
    // ------------ redirect
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }
    const userRole: UserRole = verifiedToken.role;

    if(!result.success){ //m 68-1
      throw new Error(result.message || "login failed")
    } 

    // redirect from next/navigation and redirect according to user
    // const redirectPath = redirectTo ? redirectTo.toString() : getDefaultDashboardRoute(userRole)

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }

    // return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return { success: false, message: `${process.env.NODE_ENV === "development" ? error.message : "Login Failed. Please provide valid email & password"}`};
  }
};
