import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Aluno } from "./Aluno";

@Entity()
export class ImagemAluno{

    @PrimaryColumn()
    matricula: number;

    @Column({type: "longblob", nullable: true})
    imagem: Buffer;
    
    @OneToOne(()=> Aluno, aluno => aluno.matricula)
    @JoinColumn({"name": "matricula"})
    aluno: Aluno;

}