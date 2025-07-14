import { PrismaClient } from "@/lib/generated/prisma";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from "ws";

// neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaNeon({ connectionString })
// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
      discountAmount: {
        compute(product) {
          return product.discountAmount.toString();
        },
      },
    },
  },
});
