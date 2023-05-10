import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import Sidebar from "~/components/settings/Sidebar";
import defaultProfileIcon from "~/assets/default profile icon.jpg";

export default function BillingSettingsPage() {
  const { data: session } = useSession();

  if (!session) return <span>please go log in</span>;
  return (
    <div className="flex h-screen flex-row text-sm">
      <Sidebar />
      <div className="grow p-8">
        <div className="mt-16 flex flex-col border-b border-[#E7E9EB] pb-8">
          <span className="mb-1 text-xl font-bold leading-5 tracking-wide text-[#111827]">
            Billing
          </span>
          <span className="text-sm text-[#374151]">
            Manage all things billing
          </span>
        </div>
        <div className="mt-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col text-[#374151]">
              <span className="font-medium">
                View and manage your billing details
              </span>
              <span>
                View and edit your billing details, as well as cancel your
                subscription.
              </span>
            </div>
            <div>
              <button className="rounded-md bg-[#292929] px-4 py-2 text-white">
                Billing portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
