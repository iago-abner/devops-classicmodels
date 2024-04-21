import { prisma } from "../lib/prisma";
import { Router } from "express";

const project = Router();

project.get("/", async (_, res) => {
  const allProjects = await prisma.projeto.findMany({
    where: {
      deletedAt: null,
    },
  });
  res.status(200).json(allProjects);
});

project.get("/:id", async (req, res) => {
  const { id } = req.params;

  const project = await prisma.projeto.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json(project);
});

project.get("/:id/pessoas", async (req, res) => {
  const { id } = req.params;

  const countPersonsInProject = await prisma.projeto.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: { PessoaProjeto: true },
      },
    },
  });
  res.status(200).json(countPersonsInProject);
});

project.post("/", async (req, res) => {
  const { nome } = req.body;
  const newProject = await prisma.projeto.create({
    data: {
      nome,
    },
  });
  res.status(201).json(newProject);
});

project.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedProject = await prisma.projeto.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  res.status(204).json(deletedProject);
});
