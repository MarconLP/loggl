import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  getApiKeys: protectedProcedure.mutation(
    async ({ ctx: { session, prisma } }) => {
      const apiKeys = await prisma.apiToken.findMany({
        where: {
          userId: session.user.id,
        },
      });
      return apiKeys;
    },
  ),
  createApiKey: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { session, prisma }, input }) => {
      const token = [...Array(60)]
        .map(() => ((Math.random() * 36) | 0).toString(36))
        .join("");

      await prisma.apiToken.create({
        data: {
          userId: session.user.id,
          name: input.name,
          token,
        },
      });
      return "OK";
    }),
});
