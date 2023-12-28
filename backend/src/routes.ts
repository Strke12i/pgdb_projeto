import { Request, Response, Router, NextFunction } from "express";
import { AlunoController } from "./controller/AlunoController";
import { ProfessorController } from "./controller/ProfessorController";
import { TurmaController } from "./controller/TurmaController";
import { AulaController } from "./controller/AulaController";
import { AvaliacaoController } from "./controller/AvaliacaoController";
import { AuthController } from "./controller/authController";
import {ImagemAlunoController} from "./controller/ImagemAlunoController";
import { PessoaAlunoController} from "./controller/PessoaAlunoController";

const router = Router();

const alunoController = new AlunoController();
const professorController = new ProfessorController();
const turmaController = new TurmaController();
const aulaController = new AulaController();
const avaliacaoController = new AvaliacaoController();
const alunoImagemController = new ImagemAlunoController();
const authController = new AuthController();
const pessoaAlunoController = new PessoaAlunoController();


const alunoRouter: Router = alunoController.router();
const aulaRouter: Router = aulaController.router();
const authRouter: Router = authController.router();
const avaliacaoRouter: Router = avaliacaoController.router();
const alunoImagemRouter: Router = alunoImagemController.router();
const pessoaAlunoRouter: Router = pessoaAlunoController.router();
const professorRouter: Router = professorController.router();
const turmaRouter: Router = turmaController.router();


router.use("/alunos", alunoRouter);
router.use("/professores", professorRouter);
router.use("/turmas", turmaRouter);
router.use("/aulas", aulaRouter);
router.use("/avaliacoes", avaliacaoRouter);
router.use("/auth", authRouter);
router.use("/alunosImagem", alunoImagemRouter);
router.use("/pessoaAluno", pessoaAlunoRouter);

export default router;
