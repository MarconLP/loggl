import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const feedRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
  }),
  get: publicProcedure.query(({}) => {
    return {
      events: [
        {
          event: "Form Submitted",
          description: "A form was submitted",
          timestamp: 1683419171057,
          icon: "🔥",
        },
        {
          event: "Form Submitted",
          description: "A form was submitted",
          timestamp: 1683419171051,
          icon: "🔥",
        },
        {
          event: "Form Submitted",
          description: "A form was submitted",
          timestamp: 1683419171053,
          icon: "🔥",
        },
      ],
    };
  }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.post.delete({ where: { id: input } });
  }),
});
