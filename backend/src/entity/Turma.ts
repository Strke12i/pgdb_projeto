import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Professor } from "./Professor";
import { Aluno } from "./Aluno";
import { Aula } from "./Aula";

@Entity({name: "turma"})
export class Turma{
    @PrimaryGeneratedColumn()
    codigoTurma: number;

    @Column()
    disciplina: string;

    @Column()
    ano: number;

    @Column()
    serie: number;

    @ManyToOne(() => Professor, professor => professor.turma)
    professor: Professor;
    
    @ManyToMany(()=> Aluno)
    @JoinTable()
    alunos: Aluno[];

    @OneToMany(() => Aula, aula => aula.turma, {cascade: true})
    aulas: Aula[];
}