import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.project.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        channels: true,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const project = await prisma.project.create({
        data: {
          name: input.name,
          userId: session.user.id,
        },
      });
      return {
        project,
      };
    }),
});
