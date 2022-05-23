import {LoginDetailsType} from "../components/auth/Login";

export async function authenticate(payload: LoginDetailsType): Promise<boolean> {
  const users = await fetch('data/users.json')
    .then(res => res.json())

  return !!users.find((u: any) =>
      u.username === payload.username && u.password === payload.password)
}


