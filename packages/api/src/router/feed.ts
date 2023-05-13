import { z } from "zod";

import { posthog } from "../../posthog";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(10).max(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx: { session, prisma }, input }) => {
      const notifications = await prisma.notification.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          userId: session.user.id,
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

      posthog?.capture({
        distinctId: session.user.id,
        event: "get all feed",
        properties: {
          limit: input.limit,
          cursor: input.cursor,
        },
      });
      void posthog?.shutdownAsync();

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
    .query(async ({ ctx: { session, prisma }, input }) => {
      const notifications = await prisma.notification.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          projectId: input.projectId,
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

      posthog?.capture({
        distinctId: session.user.id,
        event: "get project feed",
        properties: {
          limit: input.limit,
          cursor: input.cursor,
          projectId: input.projectId,
        },
      });
      void posthog?.shutdownAsync();

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
    .query(async ({ ctx: { session, prisma }, input }) => {
      const notifications = await prisma.notification.findMany({
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: {
          channelId: input.channelId,
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

      posthog?.capture({
        distinctId: session.user.id,
        event: "get channel feed",
        properties: {
          limit: input.limit,
          cursor: input.cursor,
        },
      });
      void posthog?.shutdownAsync();

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

      posthog?.capture({
        distinctId: session.user.id,
        event: "delete notification",
        properties: {
          notificationId: input.id,
        },
      });
      void posthog?.shutdownAsync();

      return project;
    }),
});
