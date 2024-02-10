import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import { loginUser } from "../helpers/api-communicators";

type User = {
    name: string,
    email: string
}

// Custom type: UserAuth
type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string)=>Promise<void>;
    signup: (name: string, email: string, password: string)=>Promise<void>;
    logout: ()=>Promise<void>;
}

// "context" is a way to pass data through the component tree without having
// to pass props manually at evey level. It is particularly useful for sharing 
// global state, like authentication status or user information, with components that need it.

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // fetch if the user's cookies are valid then skip login
    }, []);
    
    const login = async(email: string, password: string) => {
        const data = await loginUser(email, password);
        if(data) {
            setUser({email: data.email, name: data.name});
            setIsLoggedIn(true);
        }
    };
    const signup = async(name: string, email: string, password: string) => {

    };
    const logout = async() => {

    };

    const value = {
        user, 
        isLoggedIn,
        login,
        logout,
        signup,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);