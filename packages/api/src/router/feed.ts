import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        projects: {
          include: {
            channels: true,
          },
        },
      },
    });
    return {
      user,
    };
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({});
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
