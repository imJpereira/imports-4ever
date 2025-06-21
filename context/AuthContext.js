import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    const signIn = (credentials) => {

        //para teste:
        credentials = {
            id: 1,
            name: "admin"
        }

        //fazer requisição para o backend validando as credenciais
        //const response = await axios.post("http://localhost:8000/auth/signin", credentials)
        //if response != null {
        setUser(credentials);
        setToken("token-teste") //response
    };

    const signUp = (userData) => {

        //validações


        //const response = await axios.post("http://localhost:8000/auth/signup", userData)
        //retorna as credenciais

        signIn({id: 2, name: "user2"}); //response
    }

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, signIn, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);