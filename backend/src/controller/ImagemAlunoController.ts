import { log } from "console";
import { AppDataSource } from "../data-source";
import { ImagemAluno } from "../entity/ImagemAluno";
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
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

export class ImagemAlunoController {
    private imagemAlunoRepository = AppDataSource.getRepository(ImagemAluno);

    async findImagemAluno(req: Request, res: Response, next: NextFunction) {
        const { matricula } = req.params;

        const mat = parseInt(matricula);

        const imagemAluno = await this.imagemAlunoRepository.findOne({
            where: { matricula: mat }
        })

        if (!imagemAluno) {
            return res.status(404).json({ message: "ImagemAluno não encontrado" });
        }

        res.contentType("image/jpeg");
        res.send(imagemAluno.imagem);

        return next();
    }

    async save(req: Request, res: Response, next: NextFunction) {
        const { matricula } = req.body;
        if (await this.imagemAlunoRepository.findOne({ where: { matricula } })) {
            return res.status(409).json({ message: "Aluno já possui imagem cadastrada" });
        }

        const imagemAluno = Object.assign(new ImagemAluno(), {
            matricula
        })

        try {
            imagemAluno.imagem = fs.readFileSync("./src/uploads/alunos/" + req.file.filename);
            await this.imagemAlunoRepository.save(imagemAluno);
            return res.status(201).json({ message: "ImagemAluno cadastrado" });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao cadastrar ImagemAluno" });
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { matricula } = req.body;
        const alunoImagem = await this.imagemAlunoRepository.findOne({ where: { matricula } });
        if (!alunoImagem) {
            return res.status(404).json({ message: "ImagemAluno não encontrado" });
        }

        try {

            alunoImagem.imagem = fs.readFileSync("./src/uploads/alunos/" + req.file.filename);
            await this.imagemAlunoRepository.update(alunoImagem.matricula, alunoImagem);
            return res.status(200).json({ message: "ImagemAluno atualizado" });

        } catch (err) {
            return res.status(500).json({ message: "Erro ao atualizar ImagemAluno" });
        }

    }

    router(){
        const router = require("express").Router();
        router.get("/:matricula", (req: Request, res: Response) => {
            this.findImagemAluno(req, res, () => { });
        }); 
        router.post("/", uploadFile.single("image"), (req: Request, res: Response) => {
            this.save(req, res, () => { });
        });
        router.put("/", uploadFile.single("image"), (req: Request, res: Response) => {
            this.update(req, res, () => { });
        });
        return router;
    }
}