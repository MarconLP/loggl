import { signIn, useSession } from "next-auth/react";

import LoadingSpinner from "~/components/LoadingSpinner";
import Sidebar from "~/components/settings/Sidebar";

interface Props {
  children: string | JSX.Element | JSX.Element[] | "() => JSX.Element";
}

export default function SettingsLayout({ children }: Props) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      void signIn();
    },
  });

  return (
    <div className="flex h-screen flex-row text-sm">
      <Sidebar />
      {session ? (
        <div className="grow p-8">{children}</div>
      ) : (
        <div className="mt-8 flex w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
