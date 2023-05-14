import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { posthog } from "@acme/api/posthog";
import { prisma } from "@acme/db";

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      completed_onboarding: boolean;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    email_verified?: string;
  }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.completed_onboarding = user.completed_onboarding;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    signIn({ account, profile }) {
      if (account?.provider === "google") {
        return !!profile?.email_verified;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  events: {
    signIn: ({ user, account, isNewUser }) => {
      posthog?.capture({
        distinctId: user.id,
        event: "signed in",
        properties: {
          name: user.name,
          email: user.email,
          provider: account?.provider,
          isNewUser,
        },
      });
      void posthog?.shutdownAsync();
    },
    signOut: ({ session }) => {
      // posthog?.capture({
      //   distinctId: session.id,
      //   event: "logged out",
      // });
      console.log("add logout event");
    },
    createUser: ({ user }) => {
      posthog?.capture({
        distinctId: user.id,
        event: "create user",
        properties: {
          name: user.name,
          email: user.email,
        },
      });
      void posthog?.shutdownAsync();
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  pages: {
    signIn: "/sign-in",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
  },
};
