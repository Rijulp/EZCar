// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from './generated/prisma';

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// This code initializes a Prisma Client instance and ensures that it is reused in development mode to prevent exhausting database connections.
// In production, a new instance is created each time.