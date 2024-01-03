import { Avaliacao } from "../entity/Avaliacao";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response, Router } from "express";
import { Aluno } from "../entity/Aluno";
import { Aula } from "../entity/Aula";
import { Turma } from "../entity/Turma";
import { log } from "console";

export class AvaliacaoController{
    private avaliacaoRepository = AppDataSource.getRepository(Avaliacao);

    async findAvaliacao(request: Request, response: Response, next: NextFunction){
        const { codigoAvaliacao } = request.params;
        if(!codigoAvaliacao){
            return response.status(400).json({message: "Informe o código da avaliacao"});
        }
        const cod = parseInt(codigoAvaliacao);

        const avaliacao = await this.avaliacaoRepository.findOne({
            where: { codigoAvaliacao: cod },
            relations: ['aula']
        });

        if(!avaliacao){
            return response.status(404).json({message: "Avaliacao não encontrada"});
        }

        return response.status(200).json({message: "Avaliacao encontrada", avaliacao});
    }

    async save(request: Request, response: Response, next: NextFunction){
        const {notaAvaliacao, descricao, codigoAula, matricula} = request.body;

        const avaliacao = Object.assign(new Avaliacao(), {
            notaAvaliacao,
            descricao,
            
        })   
        avaliacao.aluno = await AppDataSource.getRepository(Aluno).findOne({    
            where: {matricula}
        })

        avaliacao.aula = await AppDataSource.getRepository(Aula).findOne({
            where: {codigoAula}
        })

        try{
            this.avaliacaoRepository.save(avaliacao);
            return response.status(201).json({message: "Avaliacao cadastrada"});
        }catch(err){
            return response.status(500).json({message: "Erro ao cadastrar avaliacao"});
        }
        
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {codigoAvaliacao, notaAvaliacao, descricao, codigoAula, matricula} = request.body;
        const avaliacao = await this.avaliacaoRepository.findOne({
            where: {codigoAvaliacao}
        })

        if(!avaliacao){
            return response.status(404).json({message: "Avaliacao não encontrada"});
        }

        avaliacao.notaAvaliacao = notaAvaliacao;
        avaliacao.descricao = descricao;
        avaliacao.aluno = await AppDataSource.getRepository(Aluno).findOne({    
            where: {matricula}
        })
        avaliacao.aula = await AppDataSource.getRepository(Aula).findOne({
            where: {codigoAula}
        })

        try{
            this.avaliacaoRepository.save(avaliacao);
            return response.status(200).json({message: "Avaliacao atualizada"});
        }catch(err){
            return response.status(500).json({message: "Erro ao atualizar avaliacao"});
        }
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {codigoAvaliacao} = request.body;

        const avaliacao = await this.avaliacaoRepository.findOne({
            where: {codigoAvaliacao}
        })

        if(!avaliacao){
            return response.status(404).json({message: "Avaliacao não encontrada"});
        }

        try{
            this.avaliacaoRepository.delete(avaliacao.codigoAvaliacao);
            return response.status(200).json({message: "Avaliacao deletada"});
        }catch(err){
            return response.status(500).json({message: "Erro ao deletar avaliacao"});
        }
    }

    async findAulasNotWithNoAvaliation(request: Request, response: Response, next: NextFunction){
        const { matricula } = request.params;
        if(!matricula){
            return response.status(400).json({message: "Informe a matricula do aluno"});
        }

        const mat = parseInt(matricula);
        const aluno = await AppDataSource.getRepository(Aluno).findOne({
            where: {matricula: mat}
        })

        if(!aluno){
            return response.status(404).json({message: "Aluno não encontrado"});
        }

        const turmas = await AppDataSource.getRepository(Turma).createQueryBuilder("turma")
        .leftJoinAndSelect("turma.alunos", "aluno").where("aluno.matricula = :matricula", {matricula: mat}).getMany();

        if(!turmas || turmas.length == 0){
            return response.status(404).json({message: "Turmas não encontradas"});
        }

        const aulas = await AppDataSource.getRepository(Aula).find({
            where: {turma: turmas},
        });

        if(!aulas){
            return response.status(404).json({message: "Aulas não encontradas"});
        }

        const avaliacoes = await AppDataSource.getRepository(Avaliacao).find({
            where: {aluno: aluno},
            relations: ['aula']
        })

        const aulasNotWithNoAvaliation = aulas.filter(aula => {
            return !avaliacoes.find(avaliacao => avaliacao.aula.codigoAula == aula.codigoAula)
        });

        return response.status(200).json({message: "Aulas encontradas", aulas: aulasNotWithNoAvaliation});
    }

    async findAvaliacoesByAula(request: Request, response: Response, next: NextFunction){
        const { codigoAula } = request.params;
        if(!codigoAula){
            return response.status(400).json({message: "Informe o código da aula"});
        }

        const cod = parseInt(codigoAula);
        const aula = await AppDataSource.getRepository(Aula).findOne({
            where: {codigoAula: cod}
        });

        if(!aula){
            return response.status(404).json({message: "Aula não encontrada"});
        }

        const avaliacoes = await this.avaliacaoRepository.createQueryBuilder("avaliacao")
            .leftJoinAndSelect("avaliacao.aula", "aula").where("aula.codigoAula = :codigoAula", {codigoAula: cod})
            .getMany();

        if(!avaliacoes){
            return response.status(404).json({message: "Avaliacoes não encontradas"});
        } 

        const filter_avaliacoes = {}
        for (let index = 0; index < 6; index++) {
            filter_avaliacoes[index.toString()] = {count: 0, descricoes: []};    
        }
        avaliacoes.forEach(
            (avaliacao) => {
                if(avaliacao.notaAvaliacao >= 0 && avaliacao.notaAvaliacao < 6){
                    filter_avaliacoes[avaliacao.notaAvaliacao].count += 1;
                    if(avaliacao.descricao){
                        filter_avaliacoes[avaliacao.notaAvaliacao].descricoes.push(avaliacao.descricao);
                    }
                }
            }
        )

        return response.status(200).json({message: "Avaliacoes encontradas", filter_avaliacoes});
    }
    
    router(){
        const router = Router();
        router.get("/:codigoAvaliacao", (req: Request, res: Response) => {
            this.findAvaliacao(req, res, () => {});
        });
        router.post("/", (req: Request, res: Response) => {
            this.save(req, res, () => {});
        });
        router.put("/", (req: Request, res: Response) => {
            this.update(req, res, () => {});
        });
        router.delete("/", (req: Request, res: Response) => {
            this.delete(req, res, () => {});
        });
        router.get("/aluno/:matricula", (req: Request, res: Response) => {
            this.findAulasNotWithNoAvaliation(req, res, () => {});
        });
        router.get("/avaliacoes/:codigoAula", (req: Request, res: Response) => {
            this.findAvaliacoesByAula(req, res, () => {});
        });

        return router;
    }
}