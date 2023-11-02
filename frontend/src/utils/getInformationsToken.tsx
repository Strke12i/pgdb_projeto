import jwt_decode from "jwt-decode";
import { useAuth } from "../context/AuthContext";

type DecodedJwt = {
    matricula?: number;
    codigoProfessor?: number;
    exp: number;
    iat: number;
    role: string;
}

export const getInformationsToken = () => {
    const {authState} = useAuth();
    const token = authState?.token;
    if(token){
        const decoded = jwt_decode<DecodedJwt>(token);
        return decoded;
    }
    return null;
}

export const getIdentifier = () => {
    const DecodedJwt = getInformationsToken();
    let identifier: number;
    let role: string;

    if(DecodedJwt?.matricula){
        identifier = DecodedJwt.matricula;
        role = DecodedJwt.role;
    }else if(DecodedJwt?.codigoProfessor){
		identifier = DecodedJwt.codigoProfessor;
		role = DecodedJwt.role;
	}
	else{
        identifier = 0;
        role = '';
    }

    return {identifier, role};
}
