import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { prisma } from "./db.js";

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://b0c66646-a2e4-4037-9f6f-fd0222b6ebba-00-19e4fhe7avt72.picard.replit.dev/",
  ],
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [openAPI()],
});
