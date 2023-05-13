import { z } from "zod";

import { posthog } from "../../posthog";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return "you can see this secret message!";
  }),
  registerPushToken: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx: { session, prisma }, input }) => {
      await prisma.pushToken.upsert({
        where: {
          token: input.token,
        },
        create: {
          token: input.token,
          userId: session.user.id,
        },
        update: {
          token: input.token,
          userId: session.user.id,
        },
      });

      posthog?.capture({
        distinctId: session.user.id,
        event: "push token registered",
      });
      void posthog?.shutdownAsync();

      return "OK";
    }),
});
