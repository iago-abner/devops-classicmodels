import { prisma } from "../lib/prisma";
import { Router } from "express";

export const customer = Router();

customer.get("/", async (_, res) => {
  try {
    const customers = await prisma.customers.findMany();
    res.json(customers);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

customer.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        customerNumber: parseInt(id),
      },
    });
    if (!customer) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Erro ao buscar cliente por ID:", error);
    res.status(500).json({ error: "Erro ao buscar cliente por ID" });
  }
});

customer.post("/", async (req, res) => {
  const { body } = req;
  try {
    const newCustomer = await prisma.customers.create({
      data: body,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
});

customer.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.customers.delete({
      where: {
        customerNumber: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
});

customer.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedCustomer = await prisma.customers.update({
      where: {
        customerNumber: parseInt(id),
      },
      data: body,
    });
    res.json(updatedCustomer);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});
