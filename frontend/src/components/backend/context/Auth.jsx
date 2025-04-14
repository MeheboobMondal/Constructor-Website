import {createContext, useState} from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const userData = localStorage.getItem('userData')
    const [user, setUserData] = useState(userData)

    const login = (user) => {
        setUserData(user)
    }

    const logout = () => {
        localStorage.removeItem('userData')
        setUserData('')
    }

    return (<AuthContext.Provider
        value={{
            login,
            logout,
            user
        }}
    >
        {children}
    </AuthContext.Provider>)
}