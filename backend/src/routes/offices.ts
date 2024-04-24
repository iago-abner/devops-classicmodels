import { prisma } from "../lib/prisma";
import { Router } from "express";

export const offices = Router();

offices.get("/", async (req, res) => {
  try {
    const offices = await prisma.offices.findMany();
    res.json(offices);
  } catch (error) {
    console.error("Erro ao buscar escritórios:", error);
    res.status(500).json({ error: "Erro ao buscar escritórios" });
  }
});

offices.get("/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const office = await prisma.offices.findUnique({
      where: {
        officeCode: code,
      },
    });
    if (!office) {
      return res.status(404).json({ error: "Escritório não encontrado" });
    }
    res.json(office);
  } catch (error) {
    console.error("Erro ao buscar escritório por código:", error);
    res.status(500).json({ error: "Erro ao buscar escritório por código" });
  }
});

offices.post("/", async (req, res) => {
  const { body } = req;
  try {
    const newOffice = await prisma.offices.create({
      data: body,
    });
    res.status(201).json(newOffice);
  } catch (error) {
    console.error("Erro ao criar escritório:", error);
    res.status(500).json({ error: "Erro ao criar escritório" });
  }
});

offices.delete("/:code", async (req, res) => {
  const { code } = req.params;
  try {
    await prisma.offices.delete({
      where: {
        officeCode: code,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao deletar escritório:", error);
    res.status(500).json({ error: "Erro ao deletar escritório" });
  }
});

offices.put("/:code", async (req, res) => {
  const { code } = req.params;
  const { body } = req;
  try {
    const updatedOffice = await prisma.offices.update({
      where: {
        officeCode: code,
      },
      data: body,
    });
    res.json(updatedOffice);
  } catch (error) {
    console.error("Erro ao atualizar escritório:", error);
    res.status(500).json({ error: "Erro ao atualizar escritório" });
  }
});
