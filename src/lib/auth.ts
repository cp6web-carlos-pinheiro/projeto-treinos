import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";

import { prisma } from "./db.js";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,  
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://yw5sjw-3000.csb.app",
    "http://3000-codeanywhere-templates-t-pemyj8yccj.app.codeanywhere.com",
    "https://b0c66646-a2e4-4037-9f6f-fd0222b6ebba-00-19e4fhe7avt72.picard.replit.dev",
  ],  
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [openAPI()],
});
