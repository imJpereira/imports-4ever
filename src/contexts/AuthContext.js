import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    
    const signIn = (credentials) => {

        //para teste:
        credentials = {
            id: "5b89267f-86e2-4eda-a51a-0a30584a20c3",
            name: "meu amorrrrr"
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

        signIn({id: 1, name: "admin"}); //response
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