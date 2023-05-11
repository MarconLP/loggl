import { LinkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

import Sidebar from "~/components/settings/Sidebar";

export default function ApiKeysSettingsPage() {
  const { data: session } = useSession();

  if (!session) return <span>please go log in</span>;
  return (
    <div className="flex h-screen flex-row text-sm">
      <Sidebar />
      <div className="grow p-8">
        <div className="mt-16 flex flex-col border-b border-[#E7E9EB] pb-8">
          <span className="mb-1 text-xl font-bold leading-5 tracking-wide text-[#111827]">
            API keys
          </span>
          <span className="text-sm text-[#374151]">
            API keys allow other apps to communicate with Loggl.net
          </span>
        </div>
        <div className="mt-8">
          <div className="min-h-80 border-subtle flex w-full flex-col items-center justify-center rounded-md border border-dashed p-7 lg:p-20">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#e5e7eb] ">
              <LinkIcon className="inline-block h-10 w-10 stroke-[1.3px]" />
            </div>
            <div className="flex max-w-[420px] flex-col items-center">
              <h2 className="text-semibold font-cal text-emphasis mt-6 text-center text-xl">
                Create your first API key
              </h2>
              <div className="text-default mb-8 mt-3 text-center text-sm font-normal leading-6">
                API keys allow other apps to communicate with Loggl.net
              </div>
              <button className="hover:bg-muted hover:border-emphasis focus-visible:bg-subtle focus-visible:ring-empthasis relative inline-flex h-9 items-center rounded-md border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2">
                <PlusIcon className="mr-1 h-4 w-4 stroke-[1.5px]" />
                New API key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
