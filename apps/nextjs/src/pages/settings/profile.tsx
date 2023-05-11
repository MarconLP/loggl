import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import SettingsLayout from "~/components/settings/SettingsLayout";
import defaultProfileIcon from "~/assets/default profile icon.jpg";

export default function ProfileSettingsPage() {
  const { data: session } = useSession();

  return (
    <SettingsLayout>
      <>
        <div className="mt-16 flex flex-col border-b border-[#E7E9EB] pb-8">
          <span className="mb-1 text-xl font-bold leading-5 tracking-wide text-[#111827]">
            Profile
          </span>
          <span className="text-sm text-[#374151]">
            Manage settings for your Loggl.net profile
          </span>
        </div>
        <div className="mt-8">
          <div>
            <Image
              src={session?.user.image ?? defaultProfileIcon}
              alt="profile image"
              width={64}
              height={64}
              unoptimized
              className="rounded-full"
            />
          </div>
          <div className="mt-8 flex flex-col">
            <span className="mb-2 block text-sm font-medium">Username</span>
            <span className="inline-flex h-9 items-center rounded-md border bg-[#f9fafb] px-3 text-sm text-[#6b7280]">
              {session?.user.name}
            </span>
          </div>
          <div className="mt-8 flex flex-col">
            <span className="mb-2 block text-sm font-medium">Email</span>
            <span className="inline-flex h-9 items-center rounded-md border bg-[#f9fafb] px-3 text-sm text-[#6b7280]">
              {session?.user.email}
            </span>
          </div>
        </div>
        <div className="mt-12 flex flex-col border-t border-[#E7E9EB] pb-8 pt-8">
          <span className="mb-2 block text-sm font-medium">Danger Zone</span>
          <button className="hover:bg-error mt-1 inline-flex h-9 w-fit items-center rounded-md border px-4 py-2.5 text-sm font-medium transition-colors hover:border-red-100 hover:text-red-700 focus-visible:border-red-100 focus-visible:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700">
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete account
          </button>
        </div>
      </>
    </SettingsLayout>
  );
}
