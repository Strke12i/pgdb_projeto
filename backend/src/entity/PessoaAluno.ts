import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Aluno } from "./Aluno";

@Entity({name: "pessoa_aluno"})
export class PessoaAluno{
    @PrimaryColumn()
    matricula: number;

    @Column({nullable: false})
    nomeAluno: string;

    @Column({type:'date'})
    dataNascimento: Date;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    genero: string;

    @OneToOne(() => Aluno, aluno => aluno.matricula)
    @JoinColumn({name: "matricula"})
    aluno: Aluno;

}