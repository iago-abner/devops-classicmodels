import { Router } from "express";
import { prisma } from "../lib/prisma";

export const product = Router();

product.get("/", async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

product.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: {
        productCode: id,
      },
    });
    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    res.status(500).json({ error: "Erro ao buscar produto por ID" });
  }
});

product.post("/", async (req, res) => {
  const { body } = req;
  try {
    const newProduct = await prisma.products.create({
      data: body,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

product.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.products.delete({
      where: {
        productCode: id,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

product.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedProduct = await prisma.products.update({
      where: {
        productCode: id,
      },
      data: body,
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});
