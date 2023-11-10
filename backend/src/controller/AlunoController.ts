import { Aluno } from "../entity/Aluno";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { encrypt } from "../utils/crypt";
import { log } from "console";
import { DataSource } from "typeorm";
import { Turma } from "../entity/Turma";


export class AlunoController{
    private alunoRepository = AppDataSource.getRepository(Aluno);

    async findAluno(request: Request, response: Response, next: NextFunction){
        let {matricula} = request.params;
        
        const mat = parseInt(matricula);

        if(!matricula){
            return response.status(400).json({message: "Matrícula não informada"});
        }

        try{
            const aluno = await this.alunoRepository.findOne({
                where: { matricula: mat }
            });

            if(!aluno){
                return response.status(404).json({message: "Aluno não encontrado"});
            }
            return response.status(200).json({message: "Aluno encontrado", aluno});
        }catch(err){
            return response.status(500).json({message: "Erro ao buscar aluno"});
        }
    }
    async save(request: Request, response: Response, next: NextFunction){
        var {matricula, nomeAluno, senha} = request.body;

        senha = await encrypt(senha);

        if(await this.alunoRepository.findOne({where: {matricula}})){
            return response.status(409).json({message: "Aluno já cadastrado"});
        }

        const aluno = Object.assign(new Aluno(), {
            matricula,
            nomeAluno,
            senha
        })

        try{
            await this.alunoRepository.save(aluno);
            return response.status(201).json({message: "Aluno cadastrado"});
        }catch(err){
            return response.status(500).json({message: "Erro ao cadastrar aluno"});
        }
    }
    
    async update(request: Request, response: Response, next: NextFunction){
        const {matricula} = request.body;
        
        const aluno = await this.alunoRepository.findOne({
            where: {matricula}
        })

        if(!aluno){
            return response.status(404).json({message: "Aluno não encontrado"});
        }

        const {nomeAluno, senha} = request.body;
        aluno.nomeAluno = nomeAluno;
        aluno.senha = await encrypt(senha);

        try{
            await this.alunoRepository.update(aluno.matricula, aluno);
            return response.status(200).json({message: "Aluno atualizado"});
        }
        catch(err){
            return response.status(500).json({message: "Erro ao atualizar aluno"});
        }
        
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {matricula} = request.body;
        
        const aluno = await this.alunoRepository.findOne({
            where: {matricula}
        })

        if(!aluno){
            return response.status(404).json({message: "Aluno não encontrado"});
        }

        try{
            await this.alunoRepository.delete(aluno.matricula);
            return response.status(200).json({message: "Aluno deletado"});
        }catch(err){
            return response.status(500).json({message: "Erro ao deletar aluno"});
        }
        
    }

    async findTurmasByAluno(request: Request, response: Response, next: NextFunction){
        const {matricula} = request.params;
        if(!matricula){
            return response.status(400).json({message: "Matrícula não informada"});
        }

        const mat = parseInt(matricula);

        try{
            const turmas = await AppDataSource.getRepository(Turma).createQueryBuilder("turma")
                .leftJoinAndSelect("turma.alunos", "aluno").where("aluno.matricula = :matricula", {matricula: mat})
                .leftJoinAndSelect("turma.professor", "professor")
                .getMany();
            
            return response.status(200).json({message: "Turmas encontradas", turmas: turmas});
        }catch(err){
            log(err);
            return response.status(500).json({message: "Erro ao buscar turmas"});
        }

       
    }
} 