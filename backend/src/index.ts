import { prisma } from "./lib/prisma";

async function main() {
  const pessoas = await prisma.pessoa.count();
  console.log(pessoas);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// import express from "express";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// app.get("/", (_, res) => {
//   res.send("Hello World!");
// });

// async function main() {
//   await prisma.user.create({
//     data: {
//       name: "Alice",
//       email: "alice@prisma.io",
//       posts: {
//         create: { title: "Hello World" },
//       },
//       profile: {
//         create: { bio: "I like turtles" },
//       },
//     },
//   });

//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//       profile: true,
//     },
//   });
//   console.dir(allUsers, { depth: null });
// }
