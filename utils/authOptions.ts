import { NextAuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "@/lib/prismadb";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

declare module "next-auth" {
    interface Session {
      user: {
        provider?: string;
        id?: string;
      } & DefaultSession["user"];
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      provider?: string;
      id?: string;
    }
  }

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismadb),
    providers: [
      GitHubProvider({
        clientId: (process.env.GITHUB_ID as string) || "",
        clientSecret: (process.env.GITHUB_SECRET as string) || "",
      }),
      GoogleProvider({
        clientId: (process.env.GOOGLE_ID as string) || "",
        clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) || "",
      }),
      Credentials({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "text",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Credentials are required!!!");
          }
          const user = await prismadb.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
  
          if (!user || !user.hashedPassword) {
            throw new Error("Email doesnot exist");
          }
  
          const isCorrectPassword = await compare(
            credentials.password,
            user.hashedPassword
          );
  
          if (!isCorrectPassword) {
            throw new Error("Password is incorrect!!!");
          }
          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user, account }) => {
        if (account) token.provider = account.provider;
        if (user) token.id = user.id;
        return token;
      },
      session: async ({ session, token }) => {
        session.user.provider = token.provider;
        session.user.id = token.id;
        return session;
      },
    },
    pages: {
      signIn: "/auth",
      error: "/auth",
    },
    debug: process.env.NODE_ENV === "development",
    jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  };