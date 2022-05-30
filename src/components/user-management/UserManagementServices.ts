export interface UserDetails {
  username: string;
  password: string;
  persona: string;
}

export async function getAllUsers(): Promise<UserDetails[]> {
  return fetch('/data/users.json')
    .then(res => {
      if (res.ok) return res.json()
      throw res
    })
    .catch(e => console.error(e))
}
