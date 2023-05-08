import { authRouter } from "./router/auth";
import { channelRouter } from "./router/channel";
import { feedRouter } from "./router/feed";
import { projectRouter } from "./router/project";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  feed: feedRouter,
  project: projectRouter,
  channel: channelRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
