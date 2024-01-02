import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { baseUrl } from "../utils/consts";

interface AuthContextType {
    authState?: {token: string | null, authenticated : boolean | null};
    onRegister?: (code: number, password: string, nome: string, type: string) => Promise<any>;
    onLogin?: (code: number, password: string, type: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{token: string | null, authenticated : boolean | null}>
    ({token: null, authenticated: null});

    useEffect(() => {
        const LoadToken = async () => {
            const token = await SecureStore.getItemAsync("jwt_token");
            
            if(token){
                setAuthState({token, authenticated: true});
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                
            }
        }

        LoadToken();
    }, []);

    const onRegister = async (code: number, password: string, nome: string,  type: string) => {
        try{
            if(type === "aluno"){
                return await axios.post(baseUrl + "/alunos", {matricula: code, senha: password, nomeAluno: nome});
            }else{
                return await axios.post(baseUrl + "/professores", {codigoProfessor: code, senha: password, nomeProfessor: nome});
            }
           
        }catch(error){
            return {error: true, message: (error as Error).message};
        }
    }

    const onLogin = async (code: number, password: string, type: string) => {
        try{
            let result;
            if(type === "aluno"){
                result = await axios.post(baseUrl + "/auth/login", {matricula: code, senha: password});
            }else{
                result = await axios.post(baseUrl + "/auth/loginProfessor", {codigoProfessor: code, senha: password});
            }
           
            if(!result.data.token){
                return {error: true, message: "Token não encontrado"};
            }
               
            setAuthState({token: result.data.token, authenticated: true});

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync("jwt_token", result.data.token);
            console.log(SecureStore.getItemAsync("jwt_token"));
            

            return {error: false, message: "Login realizado com sucesso!"};

        }catch(error){
            return {error: true, message: (error as Error).message};
        }
    }

    const onLogout = async () => {
        try{
            await SecureStore.deleteItemAsync("jwt_token");
            setAuthState({token: null, authenticated: false});
        }catch(error){
            return {error: true, message: (error as Error).message};
        }
    }

    const value = {
        authState,
        onRegister,
        onLogin,
        onLogout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}