import { z } from "zod";

import { posthog } from "../../posthog";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx: { session, prisma } }) => {
    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        channels: true,
      },
    });

    posthog?.capture({
      distinctId: session.user.id,
      event: "get sidebar projects",
    });
    void posthog?.shutdownAsync();

    return projects;
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

      posthog?.capture({
        distinctId: session.user.id,
        event: "create project",
      });
      void posthog?.shutdownAsync();

      return {
        project,
      };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const project = await prisma.project.deleteMany({
        where: {
          userId: session.user.id,
          id: input.id,
        },
      });

      posthog?.capture({
        distinctId: session.user.id,
        event: "delete project",
      });
      void posthog?.shutdownAsync();

      return project;
    }),
});
