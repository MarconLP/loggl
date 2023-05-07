import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: {
        userId: ctx.session.user.id,
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
      });
      return {
        notifications,
      };
    }),
});
