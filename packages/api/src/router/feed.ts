import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({});
    return {
      notifications,
    };
  }),
});
