import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Turma } from "./Turma";

@Entity({name: "aula"})
export class Aula{
    @PrimaryGeneratedColumn()
    codigoAula: number;

    @Column()
    data: Date;

    @Column()
    conteudo: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Turma)
    turma: Turma;

}