import { Professor } from "../entity/Professor";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { encrypt } from "../utils/crypt";

export class ProfessorController{
    private professorRepository = AppDataSource.getRepository(Professor);

    async findProfessor(request: Request, response: Response, next: NextFunction){
        const {codigoProfessor} = request.body;

        const professor = await this.professorRepository.findOne({
            where: {codigoProfessor}
        })

        if(!professor){
            return response.status(404).json({message: "Professor não encontrado"});
        }

        return response.status(200).json({message: "Professor encontrado", professor});
    }

    async save(request: Request, response: Response, next: NextFunction){
        const {codigoProfessor, nomeProfessor, senha} = request.body;

        const encryptSenha = await encrypt(senha);

        if(await this.professorRepository.findOne({where: {codigoProfessor}})){
            return response.status(409).json({message: "Professor já cadastrado"});
        }

        const professor = Object.assign(new Professor(), {
            codigoProfessor,
            nomeProfessor,
            senha: encryptSenha
        })

        this.professorRepository.save(professor);
        return response.status(201).json({message: "Professor cadastrado"});
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {codigoProfessor} = request.body;
        
        const professor = await this.professorRepository.findOne({
            where: {codigoProfessor}
        })

        if(!professor){
            return response.status(404).json({message: "Professor não encontrado"});
        }

        const {nomeProfessor, senha} = request.body;
        professor.nomeProfessor = nomeProfessor;
        professor.senha = await encrypt(senha);

        this.professorRepository.update(professor.codigoProfessor, professor);
        return response.status(200).json({message: "Professor atualizado"});
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {codigoProfessor} = request.body;

        const professor = await this.professorRepository.findOne({
            where: {codigoProfessor}
        })

        if(!professor){
            return response.status(404).json({message: "Professor não encontrado"});
        }

        this.professorRepository.delete(professor.codigoProfessor);
        return response.status(200).json({message: "Professor deletado"});
    }

}