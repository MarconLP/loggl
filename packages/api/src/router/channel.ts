import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const channelRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      return await prisma.channel.deleteMany({
        where: {
          id: input.id,
          project: {
            userId: session.user.id,
          },
        },
      });
    }),
});
