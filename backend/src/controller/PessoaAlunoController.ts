import { log } from "console";
import { AppDataSource } from "../data-source";
import { PessoaAluno } from "../entity/PessoaAluno";
import { NextFunction, Request, Response } from "express";
import { Aluno } from "../entity/Aluno";

export class PessoaAlunoController{
    private pessoaAlunoRepository = AppDataSource.getRepository(PessoaAluno);

    async findPessoaAluno(request: Request, response: Response, next: NextFunction){
        const {matricula} = request.body;

        const pessoaAluno = await this.pessoaAlunoRepository.findOne({where: {matricula: matricula}});
        if(!pessoaAluno){
            return response.status(404).send({message: "Pessoa não encontrada"});
        }

        return response.status(200).send(pessoaAluno);

    }

    async save(request: Request, response: Response, next: NextFunction){
        const {matricula, nomeAluno, cpf, dataNascimento, email, genero} = request.body;

        const aluno = await AppDataSource.getRepository(Aluno).findOne({where: {matricula: matricula}});
        if(!aluno){
            return response.status(404).send({message: "Aluno não encontrado"});
        }

        const pessoaAluno = Object.assign(new PessoaAluno(), 
            {matricula, nomeAluno, cpf, dataNascimento, email, genero, aluno}
        );

        try{
            await this.pessoaAlunoRepository.save(pessoaAluno);
            return response.status(200).send({message: "Pessoa salva com sucesso"});
        }catch(err){
            return response.status(500).send({message: "Erro ao salvar PessoaAluno"});
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        const {matricula, nomeAluno, dataNascimento, email, genero} = request.body;
        const aluno = await AppDataSource.getRepository(Aluno).findOne({where: {matricula: matricula}});
        if(!aluno){
            return response.status(404).send({message: "Aluno não encontrado"});
        }

        const pessoaAluno = await this.pessoaAlunoRepository.findOne({where: {matricula: matricula}});
        if(!pessoaAluno){
            return response.status(404).send({message: "Pessoa não encontrada"});
        }
    
        pessoaAluno.nomeAluno = nomeAluno;
        pessoaAluno.dataNascimento = dataNascimento;
        pessoaAluno.email = email;
        pessoaAluno.genero = genero;

        try{
            await this.pessoaAlunoRepository.update(pessoaAluno.matricula, pessoaAluno);
            return response.status(200).send({message: "Pessoa atualizada com sucesso"});
        }catch(err){
            return response.status(500).send({message: "Erro ao atualizar PessoaAluno"});
        }
    }

    async delete(request: Request, response: Response, next: NextFunction){
        const {matricula} = request.body;

        const pessoaAluno = await this.pessoaAlunoRepository.findOne({where: {matricula: matricula}});
        if(!pessoaAluno){
            return response.status(404).send({message: "Pessoa não encontrada"});
        }

        try{
            await this.pessoaAlunoRepository.delete(pessoaAluno);
            return response.status(200).send({message: "Pessoa deletada com sucesso"});
        }catch(err){
            return response.status(500).send({message: "Erro ao deletar PessoaAluno"});
        }
    }


}