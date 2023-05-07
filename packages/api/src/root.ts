import { authRouter } from "./router/auth";
import { feedRouter } from "./router/feed";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  feed: feedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
