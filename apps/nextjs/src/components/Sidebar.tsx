import Link from "next/link";
import { useRouter } from "next/router";
import { InboxIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const router = useRouter();
  const projects = [
    {
      id: "asdfsdfjnt",
      name: "Snapify",
      channels: [
        { name: "purchases", id: "nbdr" },
        { name: "feature usages", id: "gthjn" },
        { name: "failures", id: "asdf" },
      ],
    },
    {
      id: "gfrth",
      name: "Loggl",
      channels: [
        { name: "purchases", id: "ndfgh" },
        { name: "feature usages", id: "arbdf" },
        { name: "failures", id: "mfzj" },
      ],
    },
    {
      id: "dfhrre",
      name: "Tablane",
      channels: [
        { name: "purchases", id: "rehg" },
        { name: "feature usages", id: "cftzrst" },
        { name: "failures", id: "asef" },
      ],
    },
  ];

  return (
    <div className="w-[220px] flex-shrink-0 border-r border-[#E7E9EB]">
      <div className="flex h-[62px] items-center border-b border-[#E7E9EB]">
        <span className="ml-4">Loggl</span>
      </div>
      <div className="px-3 pt-3 text-[13px]">
        <div>
          <Link href="/dashboard/feed">
            <div
              className={`my-[1px] flex h-[27px] cursor-pointer flex-row items-center rounded pl-2 transition-colors ${
                router.asPath === "/dashboard/feed"
                  ? "bg-[#f1f3f9]"
                  : "hover:bg-[#f1f3f9]"
              }`}
            >
              <div className="mr-2 h-4 w-4">
                <InboxIcon />
              </div>
              <span className="font-medium">Feed</span>
            </div>
          </Link>
        </div>
        <div className="mt-2">
          <div className="flex h-6 cursor-pointer items-center rounded-md px-2 transition-colors hover:bg-[#f1f3f9]">
            <span className="text-xs font-medium text-[#6b6f76]">
              Your Projects
            </span>
          </div>
          <div className="mt-1 flex flex-col">
            {projects.map(({ id, name, channels }) => (
              <div key={id} className="">
                <Link key={id} href={`/dashboard/${id}/feed`}>
                  <div
                    className={`flex h-7 cursor-pointer items-center rounded-md px-2 pl-4 transition-colors hover:bg-[#f1f3f9] ${
                      router.asPath === `/dashboard/${id}/feed`
                        ? "bg-[#f1f3f9]"
                        : "hover:bg-[#f1f3f9]"
                    }`}
                  >
                    <span className="text-[13px] font-medium text-[#282A30]">
                      {name}
                    </span>
                  </div>
                </Link>
                {channels.map(({ id: channelId, name }) => (
                  <Link
                    key={channelId}
                    href={`/dashboard/${id}/${channelId}/feed`}
                  >
                    <div
                      className={`flex h-7 cursor-pointer items-center rounded-md pl-6 pr-2 transition-colors hover:bg-[#f1f3f9] ${
                        router.asPath === `/dashboard/${id}/${channelId}/feed`
                          ? "bg-[#f1f3f9]"
                          : "hover:bg-[#f1f3f9]"
                      }`}
                    >
                      <span className="text-[13px] font-medium text-[#3c4149]">
                        # {name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
