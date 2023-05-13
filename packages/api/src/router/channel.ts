import { z } from "zod";

import { posthog } from "../../posthog";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const channelRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const deleteChannel = await prisma.channel.deleteMany({
        where: {
          id: input.id,
          project: {
            userId: session.user.id,
          },
        },
      });

      posthog?.capture({
        distinctId: session.user.id,
        event: "delete channel",
      });
      void posthog?.shutdownAsync();

      return deleteChannel;
    }),
});
