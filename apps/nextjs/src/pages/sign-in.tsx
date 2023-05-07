import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";

import { getServerSession } from "@acme/auth";

export default function signInPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {Object.values(providers).map((provider) => (
            <div key={provider.id}>
              <button
                onClick={() => void signIn(provider.id)}
                className="flex w-full justify-center rounded-md bg-[#171717] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Continue with {provider.name}
              </button>
            </div>
          ))}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <a
            href="/legal/terms"
            className="font-semibold leading-6 text-blue-500 hover:underline"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/dashboard/feed" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
