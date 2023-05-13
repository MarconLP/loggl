import { spans } from "next/dist/build/webpack/plugins/profiling-plugin";
import { useRouter } from "next/router";
import { useConfig, type DocsThemeConfig } from "nextra-theme-docs";

const logo = <span>Loggl Docs</span>;

const config: DocsThemeConfig = {
  project: {
    link: "https://github.com/MarconLP/loggl",
  },
  docsRepositoryBase: "https://github.com/MarconLP/loggl/tree/main/apps/nextjs",
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Loggl Docs",
      };
    }
  },
  logo,
  head: function useHead() {
    const { title } = useConfig();
    const { route } = useRouter();
    const socialCard =
      route === "/" || !title
        ? "https://nextra.site/og.jpeg"
        : `https://nextra.site/api/og?title=${title}`;

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Loggl makes it easy to collect and store the events that matter to you and notify you when they happen! For example, you can track user actions from your SaaS project, Customer actions from your e-commerce store, or player actions from your Minecraft server."
        />
        <meta
          name="og:description"
          content="Loggl makes it easy to collect and store the events that matter to you and notify you when they happen! For example, you can track user actions from your SaaS project, Customer actions from your e-commerce store, or player actions from your Minecraft server."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="loggl.net" />
        <meta name="twitter:url" content="https://loggl.net" />
        <meta name="og:title" content={title ? title + " – Loggl" : "Loggl"} />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="Loggl" />
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/png" />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon.ico"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
  editLink: {
    text: "Edit this page on GitHub →",
  },
  feedback: {
    content: "Question? Give us feedback →",
    labels: "feedback",
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: { component: null },
};

export default config;
