import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Aluno } from "../entity/Aluno";
import { Professor } from "../entity/Professor";
import { AppDataSource } from "../data-source";
import { compare } from "../utils/crypt";
import { config } from "dotenv";
import { log } from "console";

config();

type jwtPayload = {
    matricula?: string,
    codigoProfessor?: string,
    role: string
}

export class AuthController{
    async login(request: Request, response: Response){
        const {matricula, senha} = request.body;

        const aluno = await AppDataSource.getRepository(Aluno).findOne({
            where: {matricula}
        })

        if(!aluno){
            return response.status(404).json({message: "Credenciais incorretas"});
        }

        if(await compare(senha, aluno.senha)){
            try{
                const token = jwt.sign({matricula, role: "aluno"}, "Secret", {expiresIn: '7d'});
                log(token);
                return response.status(200).json({message: "Login realizado com sucesso", token});
            }catch(err){
                return response.status(500).json({message: "Erro ao gerar token"});
            }
            
        }

        return response.status(401).json({message: "Credenciais incorretas"});
    }

    async loginProfessor(request: Request, response: Response){
        const {codigoProfessor, senha} = request.body;

        const professor = await AppDataSource.getRepository(Professor).findOne({
            where: {codigoProfessor}
        })

        if(!professor){
            return response.status(404).json({message: "Credenciais incorretas"});
        }

        if(await compare(senha, professor.senha)){
            const token = jwt.sign({codigoProfessor, role: "professor"}, "Secret", {expiresIn: '7d'});
            log(token);
            return response.status(200).json({message: "Login realizado com sucesso", token});
        }
    }

    async authenticateAluno(request: Request, response: Response, next: NextFunction){
        const token = request.header("Authorization");

        if(!token){
            return response.status(401).json({message: "Token não informado"});
        }

        try {
            jwt.verify(token, "Secret", (err, decoded: jwtPayload) => {
                if (err) {
                    return response.status(401).json({ message: "Token inválido" });
                }

                if (decoded.role !== "aluno" && decoded.role !== "admin") {
                    return response.status(401).json({ message: "Token inválido" });
                }

                return next();
            });
        } catch (err) {
            return response.status(401).json({ message: "Token inválido" });
        }
        }

    async authenticateProfessor(request: Request, response: Response, next: NextFunction){
        const token = request.header("Authorization");

        if(!token){
            return response.status(401).json({message: "Token não informado"});
        }

        try{
            jwt.verify(token, "Secret", (err, decoded: jwtPayload) => {
                log(decoded);
                if(err){
                    return response.status(401).json({message: "Token inválido"});
                }

                
                if(decoded.role !== "professor" && decoded.role !== "admin"){
                    return response.status(401).json({message: "Token inválido"});
                }
                
                return next();
            });
            }catch(err){
                return response.status(401).json({message: "Token inválido"});
            }
    }

    }

