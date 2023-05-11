import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CommandLineIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";

import { sidebarOpenAtom } from "~/utils/atoms";
import defaultProfileIcon from "~/assets/default profile icon.jpg";

export default function Sidebar() {
  const [open, setOpen] = useAtom(sidebarOpenAtom);
  const { data: session } = useSession();
  const router = useRouter();

  const navigation = [
    {
      icon: (
        <Image
          width={16}
          height={16}
          src={session?.user.image ?? defaultProfileIcon}
          alt="profile image"
          className="rounded-full"
          unoptimized
        />
      ),
      name: session?.user.name ?? "Invalid name",
      links: [
        {
          name: "Profile",
          link: "/settings/profile",
        },
      ],
    },
    {
      icon: <CreditCardIcon className="h-4 w-4" />,
      name: "Billing",
      links: [
        {
          name: "Manage billing",
          link: "/settings/billing",
        },
      ],
    },
    {
      icon: <CommandLineIcon className="h-4 w-4" />,
      name: "Developer",
      links: [
        {
          name: "API Keys",
          link: "/settings/api-keys",
        },
      ],
    },
  ];

  return (
    <div
      className={`absolute z-10 h-full w-full shrink-0 border-r border-[#E7E9EB] bg-[#f9fafb] p-6 transition-transform sm:w-[220px] ${
        open ? "" : "-translate-x-full"
      }`}
    >
      <div className="mb-6 flex flex-row items-center justify-between">
        <Link
          href="/dashboard/feed"
          className="flex cursor-pointer items-center rounded px-4 py-1 hover:bg-[#f3f4f6]"
        >
          <span className="mr-2" aria-hidden="true">
            &larr;
          </span>{" "}
          Back
        </Link>
        <div
          className="cursor-pointer p-1 sm:hidden"
          onClick={() => setOpen(!open)}
        >
          <Bars3Icon className="h-4 w-4" />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          {navigation.map(({ icon, name, links }) => (
            <div key={name}>
              <div className="flex flex-row items-center py-2">
                {icon}
                <span className="ml-3">{name}</span>
              </div>
              <div className="ml-4">
                {links.map(({ link, name }) => (
                  <Link key={link} href={link}>
                    <div
                      className={`my-1 rounded px-2 py-1 hover:bg-[#f3f4f6] ${
                        router.pathname === link ? "bg-[#e5e7eb]" : ""
                      }`}
                    >
                      <span>{name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
