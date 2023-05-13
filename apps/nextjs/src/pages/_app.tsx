import "../styles/globals.css";
import { useEffect } from "react";
import type { AppType } from "next/app";
import Head from "next/head";
import firebase from "firebase/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import { firebaseCloudMessaging } from "~/utils/firebase";
import "vercel-toast/css";
import { createToast } from "vercel-toast";

import CrispChat from "~/components/CrispChat";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const registerPushTokenMutation = api.auth.registerPushToken.useMutation();

  useEffect(() => {
    void setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token: string = (await firebaseCloudMessaging.init()) as string;
        if (token) {
          console.log("token", token);

          registerPushTokenMutation.mutate({ token });

          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Get the push notification message and triggers a toast to show it
  function getMessage() {
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
      createToast(message?.notification?.title ?? "A new event", {
        timeout: 3000,
      });
    });
  }

  return (
    <>
      <Head>
        <meta name="application-name" content="Loggl" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Loggl" />
        <meta
          name="description"
          content="Loggl makes it easy to collect and store the events that matter to you and notify you when they happen! For example, you can track user actions from your SaaS project, Customer actions from your e-commerce store, or player actions from your Minecraft server."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/t3-icon.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/t3-icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/t3-icon.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/t3-icon.svg" />

        <link rel="icon" type="image/png" sizes="32x32" href="/t3-icon.svg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/t3-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/t3-icon.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://loggl.net" />
        <meta name="twitter:title" content="Loggl" />
        <meta
          name="twitter:description"
          content="Loggl makes it easy to collect and store the events that matter to you and notify you when they happen! For example, you can track user actions from your SaaS project, Customer actions from your e-commerce store, or player actions from your Minecraft server."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/icons/android-chrome-192x192.png"
        />
        <meta name="twitter:creator" content="@Marcon565" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Loggl" />
        <meta
          property="og:description"
          content="Loggl makes it easy to collect and store the events that matter to you and notify you when they happen! For example, you can track user actions from your SaaS project, Customer actions from your e-commerce store, or player actions from your Minecraft server."
        />
        <meta property="og:site_name" content="Loggl" />
        <meta property="og:url" content="https://loggl.net" />
        <meta
          property="og:image"
          content="https://loggl.net/icons/apple-touch-icon.png"
        />

        {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />*/}
        {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />*/}
        {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />*/}
        {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />*/}
        {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />*/}
        {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />*/}
        {/*<link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />*/}
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <CrispChat />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
