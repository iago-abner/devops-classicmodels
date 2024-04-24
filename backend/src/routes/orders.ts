import { prisma } from "../lib/prisma";
import { Router } from "express";

export const orders = Router();

orders.get("/", async (_, res) => {
  try {
    const orders = await prisma.orders.findMany();
    res.json(orders);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos" });
  }
});

orders.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.findUnique({
      where: {
        orderNumber: parseInt(id),
      },
    });
    if (!order) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json(order);
  } catch (error) {
    console.error("Erro ao buscar pedido por ID:", error);
    res.status(500).json({ error: "Erro ao buscar pedido por ID" });
  }
});

orders.post("/", async (req, res) => {
  const { body } = req;
  try {
    const newOrder = await prisma.orders.create({
      data: body,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido" });
  }
});

orders.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.orders.delete({
      where: {
        orderNumber: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ error: "Erro ao deletar pedido" });
  }
});

orders.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedOrder = await prisma.orders.update({
      where: {
        orderNumber: parseInt(id),
      },
      data: body,
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
});
