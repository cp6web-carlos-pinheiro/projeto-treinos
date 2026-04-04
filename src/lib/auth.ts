import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";

import { prisma } from "./db.js";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: {
    useSecureCookies: true, // Força cookies seguros já que Replit usa HTTPS
    cookieOptions: {
      sameSite: "none", // ESSENCIAL para domínios diferentes (CSB -> Replit)
      secure: true,
    }
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://yw5sjw-3000.csb.app",
    "http://3000-codeanywhere-templates-t-pemyj8yccj.app.codeanywhere.com",
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
