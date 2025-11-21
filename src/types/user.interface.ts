import { UserRole } from "@/lib/auth-utils";

export interface UserInfo{
  name:string
  email:string;
  role:UserRole;
}

/*---------2
const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, config.jwt.jwt_secret as Secret, "1h"); -> as only email and role are sending through backend auth.service

I will use getMe route later to get more user info

Now return this userInfo inside <> as Promise on getUserInfo.ts
*/