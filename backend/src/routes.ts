import { Request, Response, Router, NextFunction } from "express";
import { AlunoController } from "./controller/AlunoController";
import { ProfessorController } from "./controller/ProfessorController";
import { TurmaController } from "./controller/TurmaController";
import { AulaController } from "./controller/AulaController";
import { AvaliacaoController } from "./controller/AvaliacaoController";
import { AuthController } from "./controller/authController";
import {ImagemAlunoController} from "./controller/ImagemAlunoController";
import { PessoaAlunoController} from "./controller/PessoaAlunoController";
import multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/alunos')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" +file.originalname)
    }
});

var uploadFile = multer({ storage: storage });

const router = Router();
const alunoRouter: Router = Router();
const professorRouter: Router = Router();
const turmaRouter: Router = Router();
const aulaRouter: Router = Router();
const avaliacaoRouter: Router = Router();
const authRouter: Router = Router();
const alunoImagemRouter: Router = Router();
const pessoaAlunoRouter: Router = Router();

const alunoController = new AlunoController();
const professorController = new ProfessorController();
const turmaController = new TurmaController();
const aulaController = new AulaController();
const avaliacaoController = new AvaliacaoController();
const alunoImagemController = new ImagemAlunoController();
const authController = new AuthController();
const pessoaAlunoController = new PessoaAlunoController();


alunoRouter.get("/:matricula", (req: Request, res: Response) => {    
    alunoController.findAluno(req, res, () => {});
});
alunoRouter.post("/", (req: Request, res: Response) => {
    alunoController.save(req, res, () => {});
});
alunoRouter.put("/", (req: Request, res: Response) => {
    alunoController.update(req, res, () => {});
});
alunoRouter.delete("/", (req: Request, res: Response) => {
    alunoController.delete(req, res, () => {});
});
alunoRouter.get("/turmas/:matricula", (req: Request, res: Response) => {
    alunoController.findTurmasByAluno(req, res, () => {});
});

professorRouter.get("/" , authController.authenticateProfessor, (req: Request, res: Response) => {
    professorController.findProfessor(req, res, () => {});
});
professorRouter.post("/", (req: Request, res: Response) => {
    professorController.save(req, res, () => {});
});
professorRouter.put("/", authController.authenticateProfessor, (req: Request, res: Response) => {
    professorController.update(req, res, () => {});
});
professorRouter.delete("/", authController.authenticateProfessor, (req: Request, res: Response) => {
    professorController.delete(req, res, () => {});
});

turmaRouter.get("/get/:codigoTurma", (req: Request, res: Response) => {
    turmaController.findTurma(req, res, () => {});
});
turmaRouter.post("/", (req: Request, res: Response) => {
    turmaController.save(req, res, () => {});
});
turmaRouter.put("/", (req: Request, res: Response) => {
    turmaController.update(req, res, () => {});
});
turmaRouter.delete("/", authController.authenticateProfessor, (req: Request, res: Response) => {
    turmaController.delete(req, res, () => {});
}); 
turmaRouter.post("/aluno", (req: Request, res: Response) => {
    turmaController.addAluno(req, res, () => {});
});
turmaRouter.delete("/aluno", (req: Request, res: Response) => {
    turmaController.removeAluno(req, res, () => {});
});
turmaRouter.get("/alunos/:codigoTurma", (req: Request, res: Response) => {
    turmaController.findAlunosByTurma(req, res, () => {});
});
turmaRouter.get("/professor/:codigoProfessor", (req: Request, res: Response) => {
    turmaController.findTurmasByProfessor(req, res, () => {});
})
turmaRouter.get("/aulas/:codigoTurma", (req: Request, res: Response) => {
    turmaController.findAulasByTurma(req, res, () => {});
});

aulaRouter.get("/:codigoAula", (req: Request, res: Response) => {
    aulaController.findAula(req, res, () => {});
});
aulaRouter.post("/", (req: Request, res: Response) => {
    aulaController.save(req, res, () => {});
});
aulaRouter.put("/", (req: Request, res: Response) => {
    aulaController.update(req, res, () => {});
});
aulaRouter.delete("/", (req: Request, res: Response) => {
    aulaController.delete(req, res, () => {});
});
aulaRouter.get("/professor/:codigoProfessor", (req: Request, res: Response) => {
    aulaController.findAulasByProfessor(req, res, () => {});
});

avaliacaoRouter.get("/:codigoAvaliacao", (req: Request, res: Response) => {
    avaliacaoController.findAvaliacao(req, res, () => {});
});
avaliacaoRouter.post("/", (req: Request, res: Response) => {
    avaliacaoController.save(req, res, () => {});
});
avaliacaoRouter.put("/", authController.authenticateAluno, (req: Request, res: Response) => {
    avaliacaoController.update(req, res, () => {});
});
avaliacaoRouter.delete("/", authController.authenticateAluno, (req: Request, res: Response) => {
    avaliacaoController.delete(req, res, () => {});
});
avaliacaoRouter.get("/aluno/:matricula", (req: Request, res: Response) => {
    avaliacaoController.findAulasNotWithNoAvaliation(req, res, () => {});
});
avaliacaoRouter.get("/avaliacoes/:codigoAula", (req: Request, res: Response) => {
    avaliacaoController.findAvaliacoesByAula(req, res, () => {});
});

authRouter.post("/login", (req: Request, res: Response) => {
    authController.login(req, res);
});

authRouter.post("/loginProfessor", (req: Request, res: Response) => {
    authController.loginProfessor(req, res);
});

alunoImagemRouter.get("/:matricula", (req: Request, res: Response) => {
    alunoImagemController.findImagemAluno(req, res, () => {});
});
alunoImagemRouter.post("/", uploadFile.single("image") ,(req: Request, res: Response) => {
    alunoImagemController.save(req, res, () => {});
});
alunoImagemRouter.put("/", uploadFile.single("image"), (req: Request, res: Response) => {
    alunoImagemController.update(req, res, () => {});
});

pessoaAlunoRouter.get("/:matricula", (req: Request, res: Response) => {
    pessoaAlunoController.findPessoaAluno(req, res, () => {});
});
pessoaAlunoRouter.post("/", (req: Request, res: Response) => {
    pessoaAlunoController.save(req, res, () => {});
});
pessoaAlunoRouter.put("/", (req: Request, res: Response) => {
    pessoaAlunoController.update(req, res, () => {});
});
pessoaAlunoRouter.delete("/", (req: Request, res: Response) => {
    pessoaAlunoController.delete(req, res, () => {});
});


router.use("/alunos", alunoRouter);
router.use("/professores", professorRouter);
router.use("/turmas", turmaRouter);
router.use("/aulas", aulaRouter);
router.use("/avaliacoes", avaliacaoRouter);
router.use("/auth", authRouter);
router.use("/alunosImagem", alunoImagemRouter);
router.use("/pessoaAluno", pessoaAlunoRouter);

export default router;
