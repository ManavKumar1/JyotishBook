import { User } from "@/types/user"

const KEY = "astrology_users"

export const getUsers = (): User[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export const saveUser = (user: User) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(KEY, JSON.stringify(users))
}

export const getUserById = (id: string): User | undefined => {
  return getUsers().find(u => u.id === id)
}

export const deleteUser = (id: string) => {
  const users = getUsers().filter(u => u.id !== id)
  localStorage.setItem(KEY, JSON.stringify(users))
}
export const updateUser = (updatedUser: any) => {
  const users = getUsers().map((u) =>
    u.id === updatedUser.id ? updatedUser : u
  );

  localStorage.setItem(KEY, JSON.stringify(users));
};
