import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        timestamp: "desc",
      },
    });
    return {
      notifications,
    };
  }),
  getByProject: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.notification.findMany({
        where: {
          projectId: input.projectId,
        },
        orderBy: {
          timestamp: "desc",
        },
      });
      return {
        notifications,
      };
    }),
  getByChannel: protectedProcedure
    .input(z.object({ channelId: z.string() }))
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.notification.findMany({
        where: {
          channelId: input.channelId,
        },
        orderBy: {
          timestamp: "desc",
        },
      });
      return {
        notifications,
      };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const project = await prisma.notification.deleteMany({
        where: {
          userId: session.user.id,
          id: input.id,
        },
      });

      return project;
    }),
});
