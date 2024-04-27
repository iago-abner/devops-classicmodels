import { prisma } from "../lib/prisma";
import { Router } from "express";

const router = Router();

// router.get("/top-salesperson", async (req, res) => {
//   const { startDate, endDate } = req.query;
//   try {
//     const topSalesperson = await prisma.employees.findFirst({
//       select: {
//         fullName: {
//           concat: ["firstName", " ", "lastName"],
//         },
//         totalSales: {
//           sum: {
//             orderdetails: {
//               select: {
//                 priceEach: true,
//                 quantityOrdered: true,
//               },
//               where: {
//                 order: {
//                   orderDate: {
//                     gte: new Date(startDate),
//                     lte: new Date(endDate),
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         totalSales: "desc",
//       },
//     });
//     res.json(topSalesperson);
//   } catch (error) {
//     console.error("Erro ao buscar maior vendedor:", error);
//     res.status(500).json({ error: "Erro ao buscar maior vendedor" });
//   }
// });

// router.get("/total-orders", async (req, res) => {
//   const { startDate, endDate } = req.query;
//   try {
//     const totalOrders = await prisma.orders.count({
//       where: {
//         orderDate: {
//           gte: new Date(startDate),
//           lte: new Date(endDate),
//         },
//       },
//     });
//     res.json({ totalOrders });
//   } catch (error) {
//     console.error("Erro ao buscar total de pedidos:", error);
//     res.status(500).json({ error: "Erro ao buscar total de pedidos" });
//   }
// });
// router.get("/country-with-most-customers", async (req, res) => {
//   try {
//     const countryWithMostCustomers = await prisma.customers.groupBy({
//       by: ["country"],
//       _count: {
//         _all: true,
//       },
//       orderBy: {
//         _count: "desc",
//       },
//       take: 1,
//     });
//     res.json(countryWithMostCustomers[0]);
//   } catch (error) {
//     console.error("Erro ao buscar país com mais clientes:", error);
//     res.status(500).json({ error: "Erro ao buscar país com mais clientes" });
//   }
// });

// router.get("/biggest-spender", async (req, res) => {
//   try {
//     const biggestSpender = await prisma.customers.findFirst({
//       select: {
//         customerName: true,
//         totalSpent: {
//           sum: {
//             payments: {
//               select: {
//                 amount: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         totalSpent: "desc",
//       },
//     });
//     res.json(biggestSpender);
//   } catch (error) {
//     console.error("Erro ao buscar maior gastador:", error);
//     res.status(500).json({ error: "Erro ao buscar maior gastador" });
//   }
// });
// router.get("/most-sold-product", async (req, res) => {
//   const { startDate, endDate } = req.query;
//   try {
//     const mostSoldProduct = await prisma.products.findFirst({
//       select: {
//         productName: true,
//         totalQuantity: {
//           sum: {
//             quantityOrdered: true,
//           },
//         },
//       },
//       orderBy: {
//         totalQuantity: "desc",
//       },
//       include: {
//         orderdetails: {
//           where: {
//             order: {
//               orderDate: {
//                 gte: new Date(startDate),
//                 lte: new Date(endDate),
//               },
//             },
//           },
//         },
//       },
//     });
//     res.json(mostSoldProduct);
//   } catch (error) {
//     console.error("Erro ao buscar produto mais vendido:", error);
//     res.status(500).json({ error: "Erro ao buscar produto mais vendido" });
//   }
// });
