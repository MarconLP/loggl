import { z } from "zod";

import { posthog } from "../../posthog";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  getApiKeys: protectedProcedure.query(async ({ ctx: { session, prisma } }) => {
    const apiKeys = await prisma.apiToken.findMany({
      where: {
        userId: session.user.id,
      },
    });

    posthog?.capture({
      distinctId: session.user.id,
      event: "get all api keys",
      properties: {
        apiKeysAmount: apiKeys.length,
      },
    });
    void posthog?.shutdownAsync();

    return apiKeys;
  }),
  createApiKey: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { session, prisma }, input }) => {
      const token = [...Array<undefined>(60)]
        .map(() => ((Math.random() * 36) | 0).toString(36))
        .join("");

      await prisma.apiToken.create({
        data: {
          userId: session.user.id,
          name: input.name,
          token,
        },
      });

      posthog?.capture({
        distinctId: session.user.id,
        event: "create api keys",
        properties: {
          name: input.name,
        },
      });
      void posthog?.shutdownAsync();

      return "OK";
    }),
  deleteApiKey: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { session, prisma }, input }) => {
      await prisma.apiToken.deleteMany({
        where: {
          userId: session.user.id,
          id: input.id,
        },
      });

      posthog?.capture({
        distinctId: session.user.id,
        event: "delete api keys",
      });
      void posthog?.shutdownAsync();

      return "OK";
    }),
});
