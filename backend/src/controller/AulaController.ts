import { Aula } from "../entity/Aula";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Turma } from "../entity/Turma";

export class AulaController{
    private aulaRepository = AppDataSource.getRepository(Aula);

    async findAula(request: Request, response: Response, next: NextFunction){
        const { codigoAula } = request.params;
        if(!codigoAula){
            return response.status(400).json({message: "Código da aula não informado"});
        }
        const cod = parseInt(codigoAula);

        const aula = await this.aulaRepository.findOne({
            where: { codigoAula: cod },
            relations: ['turma']

        });

        if(!aula){
            return response.status(404).json({message: "Aula não encontrada"});
        }

        return response.status(200).json({message: "Aula encontrada", aula});
    }

    async save(request: Request, response: Response, next: NextFunction){
        const {conteudo, data, codigoTurma} = request.body;

        const aula = Object.assign(new Aula(), {
            conteudo,
            data,
        })

        const turma = await AppDataSource.getRepository(Turma).findOne({
            where: {codigoTurma}
        })
        if(!turma){
            return response.status(404).json({message: "Turma não encontrada"});
        }

        aula.turma = turma;  

        try{
            await this.aulaRepository.save(aula);
            return response.status(200).json({message: "Aula salva"});
        }catch(err){
            return response.status(500).json({message: "Erro ao salvar aula"});
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {codigoAula, conteudo, data, codigoTurma} = request.body;

        const aula = await this.aulaRepository.findOne({
            where: {codigoAula}
        })

        if(!aula){
            return response.status(404).json({message: "Aula não encontrada"});
        }

        const turma = await AppDataSource.getRepository(Turma).findOne({
            where: {codigoTurma}
        })

        aula.conteudo = conteudo;
        aula.data = data;
        aula.turma = turma;

        this.aulaRepository.save(aula);
        return response.status(200).json({message: "Aula atualizada"});
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {codigoAula} = request.body;

        if(!codigoAula){
            return response.status(400).json({message: "Código da aula não informado"});
        }

        const aula = await this.aulaRepository.findOne({
            where: {codigoAula}
        })

        if(!aula){
            return response.status(404).json({message: "Aula não encontrada"});
        }

        try{
            this.aulaRepository.remove(aula);
            return response.status(200).json({message: "Aula deletada"});
        }catch(err){
            return response.status(500).json({message: "Erro ao deletar aula"});
        }
        
    }

    async findAulasByProfessor(request: Request, response: Response, next: NextFunction){
        const {codigoProfessor} = request.params
        if(!codigoProfessor){
            return response.status(400).json({message: "Código do professor não informado"});
        }

        const cod = parseInt(codigoProfessor);

        const turmas = await AppDataSource.getRepository(Turma).find({
            where: {professor: {codigoProfessor: cod}},
            relations: ['aulas']
        })

        
        if(!turmas){
            return response.status(404).json({message: "Turmas não encontradas"});
        }
        const aulas = turmas.map(turma => turma.aulas).flat();

        return response.status(200).json({message: "Aulas encontradas", aulas });
    }
}