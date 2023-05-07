import { authRouter } from "./router/auth";
import { feedRouter } from "./router/feed";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  feed: feedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
