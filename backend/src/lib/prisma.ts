import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// npx prisma introspect // busca os dados do banco de dados e cria os models
// npx prisma generate // gera os arquivos de prisma client
