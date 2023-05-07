import { authRouter } from "./router/auth";
import { feedRouter } from "./router/feed";
import { projectRouter } from "./router/project";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  feed: feedRouter,
  projects: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
