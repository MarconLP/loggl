import WithPWA from 'next-pwa';
import Nextra from 'nextra';
import { env } from "./src/env.mjs";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds and Linting.
 */
// !process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

const withPWA = WithPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production',
})

const withNextra = Nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
})

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@acme/api", "@acme/auth", "@acme/db"],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  typescript: { ignoreBuildErrors: !!process.env.CI },
  async rewrites() {
    return [
      {
        source: `/${env.NEXT_PUBLIC_POSTHOG_PROXY_SECRET}/:path*`,
        destination: `${env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
      },
    ];
  },
};

export default withPWA(withNextra(config));
