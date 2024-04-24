import { prisma } from "../lib/prisma";
import { Router } from "express";

export const employees = Router();

employees.get("/", async (req, res) => {
  try {
    const employees = await prisma.employees.findMany();
    res.json(employees);
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    res.status(500).json({ error: "Erro ao buscar funcionários" });
  }
});

employees.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employees.findUnique({
      where: {
        employeeNumber: parseInt(id),
      },
    });
    if (!employee) {
      return res.status(404).json({ error: "Funcionário não encontrado" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Erro ao buscar funcionário por ID:", error);
    res.status(500).json({ error: "Erro ao buscar funcionário por ID" });
  }
});

employees.post("/", async (req, res) => {
  const { body } = req;
  try {
    const newEmployee = await prisma.employees.create({
      data: body,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Erro ao criar funcionário:", error);
    res.status(500).json({ error: "Erro ao criar funcionário" });
  }
});

employees.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employees.delete({
      where: {
        employeeNumber: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    res.status(500).json({ error: "Erro ao deletar funcionário" });
  }
});

employees.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedEmployee = await prisma.employees.update({
      where: {
        employeeNumber: parseInt(id),
      },
      data: body,
    });
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    res.status(500).json({ error: "Erro ao atualizar funcionário" });
  }
});

employees.get("/total-sales/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const totalSales = await prisma.employees.findUnique({
      where: {
        employeeNumber: parseInt(id),
      },
      select: {
        customers: {
          select: {
            payments: {
              select: {
                amount: true,
              },
            },
          },
        },
      },
    });

    if (!totalSales)
      return res.status(404).json({ error: "Funcionário não encontrado" });

    const salesAmounts = totalSales.customers.map((customer) =>
      customer.payments.reduce(
        (acc, payment) => acc + Number(payment.amount),
        0
      )
    );
    const totalSalesAmount = salesAmounts.reduce(
      (acc, amount) => acc + amount,
      0
    );

    res.json({ totalSales: totalSalesAmount });
  } catch (error) {
    console.error("Erro ao buscar total de vendas do funcionário:", error);
    res
      .status(500)
      .json({ error: "Erro ao buscar total de vendas do funcionário" });
  }
});
