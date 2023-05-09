import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(10).max(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.notification.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          timestamp: "desc",
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (notifications.length > input.limit) {
        const nextItem = notifications.pop();
        nextCursor = nextItem?.id;
      }

      return {
        notifications,
        nextCursor,
      };
    }),
  getByProject: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(10).max(10),
        cursor: z.string().nullish(),
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.notification.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          projectId: input.projectId,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (notifications.length > input.limit) {
        const nextItem = notifications.pop();
        nextCursor = nextItem?.id;
      }

      return {
        notifications,
        nextCursor,
      };
    }),
  getByChannel: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(10).max(10),
        cursor: z.string().nullish(),
        channelId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.notification.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          channelId: input.channelId,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (notifications.length > input.limit) {
        const nextItem = notifications.pop();
        nextCursor = nextItem?.id;
      }

      return {
        notifications,
        nextCursor,
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
