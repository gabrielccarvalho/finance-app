import { getUserInfo } from '@/api/user';
import { User } from '@/lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({
  user: {} as User,
  update: (() => {}) as (user: User) => void,
})

export function UserProvider ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({} as unknown as User)

  useEffect(() => {
    async function fetchUserInfo() {
      const info: User = await getUserInfo()
      
      setUser(info)
    }

    fetchUserInfo()
  }, [])

  function updateUser (user: User) {
    setUser((currentUser) => ({
      currentUser,
      ...user
    }))
  }

  return (
    <UserContext.Provider value={{ user, update: updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const { user, update } = useContext(UserContext)

  return { user, update }
}