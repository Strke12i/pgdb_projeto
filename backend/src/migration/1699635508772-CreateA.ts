import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateA1699635508772 implements MigrationInterface {
    name = 'CreateA1699635508772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`professor\` (\`codigoProfessor\` int NOT NULL, \`nomeProfessor\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, PRIMARY KEY (\`codigoProfessor\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`aula\` (\`codigoAula\` int NOT NULL AUTO_INCREMENT, \`data\` datetime NOT NULL, \`conteudo\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`turmaCodigoTurma\` int NULL, PRIMARY KEY (\`codigoAula\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`turma\` (\`codigoTurma\` int NOT NULL AUTO_INCREMENT, \`disciplina\` varchar(255) NOT NULL, \`ano\` int NOT NULL, \`serie\` int NOT NULL, \`professorCodigoProfessor\` int NULL, PRIMARY KEY (\`codigoTurma\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pessoa_aluno\` (\`matricula\` int NOT NULL, \`nomeAluno\` varchar(255) NOT NULL, \`dataNascimento\` date NOT NULL, \`email\` varchar(255) NOT NULL, \`genero\` varchar(255) NOT NULL, PRIMARY KEY (\`matricula\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`imagem_aluno\` (\`matricula\` int NOT NULL, \`imagem\` longblob NULL, PRIMARY KEY (\`matricula\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`aluno\` (\`matricula\` int NOT NULL, \`nomeAluno\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, PRIMARY KEY (\`matricula\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`avaliacao\` (\`codigoAvaliacao\` int NOT NULL AUTO_INCREMENT, \`notaAvaliacao\` int NOT NULL, \`descricao\` varchar(255) NOT NULL, \`alunoMatricula\` int NULL, \`aulaCodigoAula\` int NULL, PRIMARY KEY (\`codigoAvaliacao\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`turma_alunos_aluno\` (\`turmaCodigoTurma\` int NOT NULL, \`alunoMatricula\` int NOT NULL, INDEX \`IDX_32ad215a02c690f73245e21621\` (\`turmaCodigoTurma\`), INDEX \`IDX_4a394ababf597d8b053785f514\` (\`alunoMatricula\`), PRIMARY KEY (\`turmaCodigoTurma\`, \`alunoMatricula\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`aula\` ADD CONSTRAINT \`FK_811f60811da6a71f8a28a834052\` FOREIGN KEY (\`turmaCodigoTurma\`) REFERENCES \`turma\`(\`codigoTurma\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`turma\` ADD CONSTRAINT \`FK_7300c027cbf0ef4d559ba29eba4\` FOREIGN KEY (\`professorCodigoProfessor\`) REFERENCES \`professor\`(\`codigoProfessor\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pessoa_aluno\` ADD CONSTRAINT \`FK_33468edcdf1e66ebb511982a4b8\` FOREIGN KEY (\`matricula\`) REFERENCES \`aluno\`(\`matricula\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`imagem_aluno\` ADD CONSTRAINT \`FK_38f276dd0cf8753ac0d45819053\` FOREIGN KEY (\`matricula\`) REFERENCES \`aluno\`(\`matricula\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`avaliacao\` ADD CONSTRAINT \`FK_422cd7738a725721bbf4ee34384\` FOREIGN KEY (\`alunoMatricula\`) REFERENCES \`aluno\`(\`matricula\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`avaliacao\` ADD CONSTRAINT \`FK_881e70984dc8c124385b14219d9\` FOREIGN KEY (\`aulaCodigoAula\`) REFERENCES \`aula\`(\`codigoAula\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`turma_alunos_aluno\` ADD CONSTRAINT \`FK_32ad215a02c690f73245e216215\` FOREIGN KEY (\`turmaCodigoTurma\`) REFERENCES \`turma\`(\`codigoTurma\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`turma_alunos_aluno\` ADD CONSTRAINT \`FK_4a394ababf597d8b053785f5144\` FOREIGN KEY (\`alunoMatricula\`) REFERENCES \`aluno\`(\`matricula\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`turma_alunos_aluno\` DROP FOREIGN KEY \`FK_4a394ababf597d8b053785f5144\``);
        await queryRunner.query(`ALTER TABLE \`turma_alunos_aluno\` DROP FOREIGN KEY \`FK_32ad215a02c690f73245e216215\``);
        await queryRunner.query(`ALTER TABLE \`avaliacao\` DROP FOREIGN KEY \`FK_881e70984dc8c124385b14219d9\``);
        await queryRunner.query(`ALTER TABLE \`avaliacao\` DROP FOREIGN KEY \`FK_422cd7738a725721bbf4ee34384\``);
        await queryRunner.query(`ALTER TABLE \`imagem_aluno\` DROP FOREIGN KEY \`FK_38f276dd0cf8753ac0d45819053\``);
        await queryRunner.query(`ALTER TABLE \`pessoa_aluno\` DROP FOREIGN KEY \`FK_33468edcdf1e66ebb511982a4b8\``);
        await queryRunner.query(`ALTER TABLE \`turma\` DROP FOREIGN KEY \`FK_7300c027cbf0ef4d559ba29eba4\``);
        await queryRunner.query(`ALTER TABLE \`aula\` DROP FOREIGN KEY \`FK_811f60811da6a71f8a28a834052\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a394ababf597d8b053785f514\` ON \`turma_alunos_aluno\``);
        await queryRunner.query(`DROP INDEX \`IDX_32ad215a02c690f73245e21621\` ON \`turma_alunos_aluno\``);
        await queryRunner.query(`DROP TABLE \`turma_alunos_aluno\``);
        await queryRunner.query(`DROP TABLE \`avaliacao\``);
        await queryRunner.query(`DROP TABLE \`aluno\``);
        await queryRunner.query(`DROP TABLE \`imagem_aluno\``);
        await queryRunner.query(`DROP TABLE \`pessoa_aluno\``);
        await queryRunner.query(`DROP TABLE \`turma\``);
        await queryRunner.query(`DROP TABLE \`aula\``);
        await queryRunner.query(`DROP TABLE \`professor\``);
    }

}
