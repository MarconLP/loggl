import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronDoubleLeftIcon, InboxIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { signIn, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { sidebarOpenAtom } from "~/utils/atoms";
import AccountMenu from "~/components/AccountMenu";
import ChannelMoreMenu from "~/components/ChannelMoreMenu";
import LoadingSpinner from "~/components/LoadingSpinner";
import NewProjectDialog from "~/components/NewProjectDialog";
import ProjectMoreMenu from "~/components/ProjectMoreMenu";

export default function Sidebar() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      void signIn();
    },
  });
  const router = useRouter();
  const { data: projects } = api.project.get.useQuery();
  const [open, setOpen] = useAtom(sidebarOpenAtom);

  const clickItem = () => {
    if (window.innerWidth < 640) setTimeout(() => setOpen(false), 1);
  };

  return (
    <div
      className={`absolute z-10 flex h-full w-full flex-shrink-0 flex-col border-r border-[#E7E9EB] bg-white duration-200 ease-in-out sm:w-[220px] ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-[62px] items-center justify-between border-b border-[#E7E9EB]">
        <span className="ml-4">Loggl</span>
        <div className="mr-4 cursor-pointer p-1" onClick={() => setOpen(false)}>
          <ChevronDoubleLeftIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="px-3 pt-3 text-[13px]">
        <div>
          <Link onClick={clickItem} href="/dashboard/feed">
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
            <NewProjectDialog />
          </div>
          <div className="mt-1 flex flex-col">
            {session && projects ? (
              projects?.map(({ id, name, channels }) => (
                <div key={id} className="">
                  <Link
                    onClick={clickItem}
                    key={id}
                    href={`/dashboard/${id}/feed`}
                  >
                    <div
                      className={`my-[2px] flex h-7 cursor-pointer items-center justify-between rounded-md px-2 pl-4 transition-colors hover:bg-[#f1f3f9] ${
                        router.asPath === `/dashboard/${id}/feed`
                          ? "bg-[#f1f3f9]"
                          : "hover:bg-[#f1f3f9]"
                      }`}
                    >
                      <span className="text-[13px] font-medium text-[#282A30]">
                        {name}
                      </span>
                      <ProjectMoreMenu projectId={id} />
                    </div>
                  </Link>
                  {channels.map(({ id: channelId, name }) => (
                    <Link
                      onClick={clickItem}
                      key={channelId}
                      href={`/dashboard/${id}/${channelId}/feed`}
                    >
                      <div
                        className={`group/channel my-[2px] flex h-7 cursor-pointer items-center justify-between rounded-md pl-6 pr-2 transition-colors hover:bg-[#f1f3f9] ${
                          router.asPath === `/dashboard/${id}/${channelId}/feed`
                            ? "bg-[#f1f3f9]"
                            : "hover:bg-[#f1f3f9]"
                        }`}
                      >
                        <span className="text-[13px] font-medium text-[#3c4149]">
                          # {name}
                        </span>
                        <ChannelMoreMenu channelId={channelId} />
                      </div>
                    </Link>
                  ))}
                </div>
              ))
            ) : (
              <div className="mt-4 flex w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-end">
        <AccountMenu />
      </div>
    </div>
  );
}
