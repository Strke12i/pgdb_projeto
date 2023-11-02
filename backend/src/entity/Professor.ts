import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import { Turma } from "./Turma";

@Entity({name: "professor"})
export class Professor{
    @PrimaryColumn()
    codigoProfessor: number;

    @Column()
    nomeProfessor: string;

    @Column()
    senha: string;

    @OneToMany(() => Turma, turma => turma.professor)
    turma: Turma[];

}