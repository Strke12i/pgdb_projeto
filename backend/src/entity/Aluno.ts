import {Entity, Column, OneToOne, PrimaryColumn, ManyToMany} from "typeorm";
import { Turma } from "./Turma";
import { PessoaAluno } from "./PessoaAluno";
import { ImagemAluno } from "./ImagemAluno";

@Entity({name: "aluno"})
export class Aluno{ 
        @PrimaryColumn()
        matricula: number;

        @Column({nullable: false})
        nomeAluno: string;

        @Column({nullable: false})
        senha: string;
 
        @ManyToMany(()=> Turma)
        turmas: Turma[];

        @OneToOne(()=> PessoaAluno, pessoaAluno => pessoaAluno.aluno)
        pessoaAluno: PessoaAluno;

        @OneToOne(()=> ImagemAluno)
        imagemAluno: ImagemAluno;
}
