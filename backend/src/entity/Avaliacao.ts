import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { Turma } from "./Turma";
import { Aula } from "./Aula";

@Entity({name: "avaliacao"})
export class Avaliacao{
    @PrimaryGeneratedColumn()
    codigoAvaliacao: number;

    @Column()
    notaAvaliacao: number;

    @Column()
    descricao: string;

    @ManyToOne(() => Aluno)
    aluno: Aluno;

    @ManyToOne(() => Aula)
    aula: Aula;
}
