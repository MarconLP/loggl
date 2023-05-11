import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { signIn, useSession } from "next-auth/react";

import { sidebarOpenAtom } from "~/utils/atoms";
import LoadingSpinner from "~/components/LoadingSpinner";
import Sidebar from "~/components/settings/Sidebar";

interface Props {
  children: string | JSX.Element | JSX.Element[] | "() => JSX.Element";
}

export default function SettingsLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
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
        <div
          className={`grow p-8 pt-[26px] transition-[margin-left] duration-150 ease-in-out ${
            sidebarOpen ? "ml-[220px]" : ""
          }`}
        >
          <div
            className="cursor-pointer p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Bars3Icon className="h-4 w-4" />
          </div>
          {children}
        </div>
      ) : (
        <div
          className={`mt-8 flex w-full items-center justify-center transition-[margin-left] duration-150 ease-in-out ${
            sidebarOpen ? "ml-[220px]" : ""
          }`}
        >
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
