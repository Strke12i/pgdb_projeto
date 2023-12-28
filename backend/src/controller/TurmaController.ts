import { Turma } from "../entity/Turma";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Professor } from "../entity/Professor";
import { Aluno } from "../entity/Aluno";
import { log } from "console";

export class TurmaController{
    private turmaRepository = AppDataSource.getRepository(Turma);

    async findTurmasByProfessor(request: Request, response: Response, next: NextFunction){
        const { codigoProfessor } = request.params;
        const cod = parseInt(codigoProfessor);

        if(!codigoProfessor){
            return response.status(400).json({message: "Código do professor não informado"});
        }

        const turmas = await this.turmaRepository.find({
            where: { professor: { codigoProfessor:cod } },
            relations: ['professor']
        });

        if(!turmas){
            return response.status(404).json({message: "Turmas não encontradas"});
        }

        return response.status(200).json({message: "Turmas encontradas", turmas});
    }

    async findTurma(request: Request, response: Response, next: NextFunction){
        const { codigoTurma } = request.params;

        if(!codigoTurma){
            return response.status(401).json({message: "Código da turma não informado"});
        }
        const cod = parseInt(codigoTurma);
    
        const turma = await this.turmaRepository.findOne({
            where: { codigoTurma: cod },
            relations: ['professor']
        });

        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        const viewTurma = {
            ...turma,
            professor: 
                {
                    nomeProfessor: turma.professor.nomeProfessor,
                    codigoProfessor: turma.professor.codigoProfessor }
        }

        return response.status(200).json({message: "Turma encontrada", turma: viewTurma});
    }

    async save(request: Request, response: Response, next: NextFunction){
        const {disciplina, ano, serie, codigoProfessor} = request.body;

        const professor = await AppDataSource.getRepository(Professor).findOne({
            where: {codigoProfessor}
        })

        const turma = Object.assign(new Turma(), {
            disciplina,
            ano,
            serie,
            professor: professor
        })

        turma.alunos = new Array<Aluno>();

        try{
            this.turmaRepository.save(turma);
            return response.status(200).json({message: "Turma cadastrada"});
        }catch(error){
            return response.status(500).json({message: "Erro ao cadastrar turma"});
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {codigoTurma, disciplina, ano, serie, codigoProfessor} = request.body;

        const turma = await this.turmaRepository.findOne({
            where: {codigoTurma}
        })

        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        turma.disciplina = disciplina;
        turma.ano = ano;
        turma.serie = serie;
        
        const professor = await AppDataSource.getRepository(Professor).findOne({
            where: {codigoProfessor}
        })

        turma.professor = professor;

        try{
            this.turmaRepository.save(turma);
            return response.status(200).json({message: "Turma atualizada"});
        }catch(error){
            return response.status(500).json({message: "Erro ao atualizar turma"});
        }
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {codigoTurma} = request.body;

        const turma = await this.turmaRepository.findOne({
            where: {codigoTurma}
        })

        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        try{
            this.turmaRepository.delete(turma);
            return response.status(200).json({message: "Turma deletada"});
        }catch(error){
            return response.status(500).json({message: "Erro ao deletar turma"});
        }
    }

    async addAluno(request: Request, response: Response, next: NextFunction){
        const {codigoTurma, matricula} = request.body;
        
        if(!codigoTurma || !matricula){
            return response.status(400).json({message: "Código da turma ou matrícula do aluno não informados"});
        }

        const turma = await this.turmaRepository.findOne({
            where: {codigoTurma},
            relations: ['alunos']
        })

        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        const aluno = await AppDataSource.getRepository(Aluno).findOne({
            where: {matricula}
        })

        if(!aluno){
            return response.status(404).json({message: "Aluno não encontrado"});
        }

        if(turma.alunos.find(aluno => aluno.matricula == matricula)){
            return response.status(409).json({message: "Aluno já adicionado"});
        }

        turma.alunos.push(aluno);

        try{
            this.turmaRepository.save(turma);
            return response.status(200).json({message: "Aluno adicionado"});
        }catch(error){
            return response.status(500).json({message: "Erro ao adicionar aluno"});
        }
    }

    async removeAluno(request: Request, response: Response, next: NextFunction){
        const {codigoTurma, matricula} = request.body;

        const turma = await this.turmaRepository.findOne({
            where: {codigoTurma},
            relations: ['alunos']
        })

        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        const aluno = await AppDataSource.getRepository(Aluno).findOne({
            where: {matricula}
        })

        if(!aluno){
            return response.status(404).json({message: "Aluno não encontrado"});
        }

        if(!turma.alunos.find(aluno => aluno.matricula == matricula)){
            return response.status(409).json({message: "Aluno não adicionado"});
        }

        turma.alunos = turma.alunos.filter(aluno => aluno.matricula != matricula);

        try{
            this.turmaRepository.save(turma);
            return response.status(200).json({message: "Aluno removido"});
        }catch(error){
            return response.status(500).json({message: "Erro ao remover aluno"});
        }
    }

    async findAlunosByTurma(request: Request, response: Response, next: NextFunction){
        const {codigoTurma} = request.params;
        if(!codigoTurma){
            return response.status(400).json({message: "Código da turma não informado"});
        }

        const cod = parseInt(codigoTurma);

        const turma = await this.turmaRepository.findOne({
            where: {codigoTurma: cod},
            relations: ['alunos']
        })

        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        return response.status(200).json({message: "Alunos encontrados", alunos: turma.alunos});
    }

    async findAulasByTurma(request: Request, response: Response, next: NextFunction){
        const {codigoTurma} = request.params;
        if(!codigoTurma){
            return response.status(400).json({message: "Código da turma não informado"});
        }
        var cod = parseInt(codigoTurma);

        const turma = await this.turmaRepository.findOne({
            where: {codigoTurma: cod},
            relations: ['aulas']
        })

        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        return response.status(200).json({message: "Aulas encontradas", aulas: turma.aulas});
    }

    router(){
        const router = require('express').Router();
        router.get("/:codigoTurma", (request: Request, response: Response) => {
            this.findTurma(request, response, () => {});
        });
        router.get("/professor/:codigoProfessor", (request: Request, response: Response) => {
            this.findTurmasByProfessor(request, response, () => {});
        });
        router.post("/", (request: Request, response: Response) => {
            this.save(request, response, () => {});
        });
        router.put("/", (request: Request, response: Response) => {
            this.update(request, response, () => {});
        });
        router.delete("/", (request: Request, response: Response) => {
            this.delete(request, response, () => {});
        });
        router.post("/aluno", (request: Request, response: Response) => {
            this.addAluno(request, response, () => {});
        });
        router.delete("/aluno", (request: Request, response: Response) => {
            this.removeAluno(request, response, () => {});
        });
        router.get("/alunos/:codigoTurma", (request: Request, response: Response) => {
            this.findAlunosByTurma(request, response, () => {});
        });
        router.get("/aulas/:codigoTurma", (request: Request, response: Response) => {
            this.findAulasByTurma(request, response, () => {});
        });

        return router;
    }
}