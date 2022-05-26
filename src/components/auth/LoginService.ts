import {LoginDetailsType} from "./Login";
import {getAllUsers, UserDetails} from "../user-management/UserManagementServices";

export async function authenticate(payload: LoginDetailsType): Promise<UserDetails | ''> {
  const users = await getAllUsers()
  return users.find((u: any) =>
      u.username === payload.username && u.password === payload.password) || ''
}


