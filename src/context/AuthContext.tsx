import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  favorites: string[]
  savedSearches: any[]
  createdAt: string
  role: 'user' | 'agent'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginAgent: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, phone?: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  addFavorite: (propertyId: string) => void
  removeFavorite: (propertyId: string) => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('luxe_user')
    const storedAuth = localStorage.getItem('luxe_auth')

    if (storedUser && storedAuth) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error loading user data:', error)
        localStorage.removeItem('luxe_user')
        localStorage.removeItem('luxe_auth')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    // Check if user exists in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('luxe_users') || '[]')
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        phone: foundUser.phone,
        favorites: foundUser.favorites || [],
        savedSearches: foundUser.savedSearches || [],
        createdAt: foundUser.createdAt,
        role: 'user',
      }

      setUser(userData)
      localStorage.setItem('luxe_user', JSON.stringify(userData))
      localStorage.setItem('luxe_auth', 'true')
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const loginAgent = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Mock agent credentials
    if (email === 'agent@luxe.com' && password === 'agent123') {
      const agentData: User = {
        id: 'agent-1',
        email: 'agent@luxe.com',
        name: 'Luxe Agent',
        favorites: [],
        savedSearches: [],
        createdAt: new Date().toISOString(),
        role: 'agent'
      }

      setUser(agentData)
      localStorage.setItem('luxe_user', JSON.stringify(agentData))
      localStorage.setItem('luxe_auth', 'true')
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const signup = async (
    name: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('luxe_users') || '[]')
    const exists = storedUsers.some((u: any) => u.email === email)

    if (exists) {
      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, this would be hashed
      name,
      phone,
      favorites: [],
      savedSearches: [],
      createdAt: new Date().toISOString(),
      role: 'user'
    }

    storedUsers.push(newUser)
    localStorage.setItem('luxe_users', JSON.stringify(storedUsers))

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      favorites: [],
      savedSearches: [],
      createdAt: newUser.createdAt,
      role: 'user'
    }

    setUser(userData)
    localStorage.setItem('luxe_user', JSON.stringify(userData))
    localStorage.setItem('luxe_auth', 'true')
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('luxe_user')
    localStorage.removeItem('luxe_auth')
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('luxe_user', JSON.stringify(updatedUser))

    // Also update in users array
    const storedUsers = JSON.parse(localStorage.getItem('luxe_users') || '[]')
    const userIndex = storedUsers.findIndex((u: any) => u.id === user.id)
    if (userIndex !== -1) {
      storedUsers[userIndex] = { ...storedUsers[userIndex], ...updates }
      localStorage.setItem('luxe_users', JSON.stringify(storedUsers))
    }
  }

  const addFavorite = (propertyId: string) => {
    if (!user) return

    if (!user.favorites.includes(propertyId)) {
      updateUser({ favorites: [...user.favorites, propertyId] })
    }
  }

  const removeFavorite = (propertyId: string) => {
    if (!user) return

    updateUser({ favorites: user.favorites.filter(id => id !== propertyId) })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginAgent,
        signup,
        logout,
        updateUser,
        addFavorite,
        removeFavorite,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
