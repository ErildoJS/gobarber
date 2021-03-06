import React, {createContext, useCallback} from 'react'
import api from '../services/api'
interface SignInCredentials {
    email: string,
    password: string
}
interface AuthContextData {
    name: string;
    SignIn(creadentials: SignInCredentials): Promise<void>;
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const SignIn = useCallback(async ({email, password}) => {
        const response = await api.post('sessions', {
            email, password
        })
    }, [])
    return (
        <AuthContext.Provider value={{name: 'erildo', SignIn}}>
            {children}
        </AuthContext.Provider>
    )
}
