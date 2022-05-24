import {LoginDetailsType} from "../components/auth/Login";

interface UserDetails {
  username: string;
  password: string;
  persona: string;
}

export async function authenticate(payload: LoginDetailsType): Promise<UserDetails> {
  const users = await fetch('data/users.json')
    .then(res => res.json())

  // Return user object and store in redux
  return users.find((u: any) =>
      u.username === payload.username && u.password === payload.password) || ''
}


