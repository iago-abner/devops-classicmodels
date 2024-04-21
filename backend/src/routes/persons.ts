import { prisma } from "../lib/prisma";
import { Router } from "express";

const persons = Router();

persons.get("/", async (_, res) => {
  const allPersons = await prisma.pessoa.findMany({
    where: {
      deletedAt: null,
    },
  });
  res.status(200).json(allPersons);
});

persons.get("/:id", async (req, res) => {
  const { id } = req.params;

  const person = await prisma.pessoa.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json(person);
});

persons.post("/", async (req, res) => {
  const { nome, cpf, email, sexo, telefone } = req.body;
  const newPerson = await prisma.pessoa.create({
    data: {
      nome,
      cpf,
      dataNascimento: new Date(1999, 3, 1, 3),
      email,
      sexo,
      telefone,
      cargo: {
        create: {
          nome: "Desenvolvedor",
          valorPorHora: 120,
        },
      },
      enderecos: {
        create: {
          numero: "0",
          complemento: "Casa",
          bairro: "Centro",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01001-000",
          rua: "Rua Teste",
        },
      },
    },
  });
  res.status(201).json(newPerson);
});

persons.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deletedPerson = await prisma.pessoa.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  res.status(204).json(deletedPerson);
});

export { persons };
