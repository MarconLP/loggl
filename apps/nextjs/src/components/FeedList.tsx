import Link from "next/link";
import { SignalSlashIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { Virtuoso } from "react-virtuoso";

import { type RouterOutputs } from "@acme/api";

import { api } from "~/utils/api";
import NewProjectDialog from "~/components/NewProjectDialog";
import NotificationMoreMenu from "~/components/NotificationMoreMenu";
import Onboarding from "~/components/Onboarding";

dayjs.extend(relativeTime);

interface Props {
  notifications: RouterOutputs["feed"]["getAll"]["notifications"];
  fetchNextPage: () => any;
}

export default function FeedList({ notifications, fetchNextPage }: Props) {
  const { data: session } = useSession();
  const { data: projects } = api.project.get.useQuery();

  return (
    <div className="flex grow flex-col items-center justify-start">
      {notifications.length > 0 && session?.user.completed_onboarding ? (
        <div className="h-full w-full overflow-y-auto">
          <Virtuoso
            data={notifications}
            defaultItemHeight={114}
            endReached={fetchNextPage}
            totalCount={notifications.length}
            itemContent={(i, { id, event, description, timestamp, icon }) => (
              <div className="px-2 pt-6">
                <div
                  key={id}
                  className="group mx-auto flex w-full max-w-[480px] flex-row rounded-lg border border-[#00000014] p-6 text-[#474747]"
                >
                  <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#00000014] bg-[#dad1bf1a]">
                    {icon}
                  </div>
                  <div className="flex grow flex-col">
                    <div>
                      <span className="font-bold">{event}</span>
                    </div>
                    <div className="flex flex-row">
                      <span>{description}</span>
                    </div>
                    <div className="flex h-4 justify-end">
                      <span className="block text-xs group-hover:hidden">
                        {dayjs(timestamp).fromNow(true)}
                      </span>
                      <NotificationMoreMenu notificationId={id} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      ) : null}

      {session?.user.completed_onboarding ? (
        projects && projects?.length <= 0 ? (
          <NewProjectDialog emptyState={true} />
        ) : notifications.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <SignalSlashIcon className="h-16 w-16" />
            <span className="text-palette-900 mb-6 mt-2 text-base font-medium leading-6 md:text-base">
              No events found
            </span>
            <Link target="_blank" href="/docs">
              <button className="inline-flex items-center rounded-md border border-transparent bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#404040] focus:outline-none">
                Documentation
              </button>
            </Link>
          </div>
        ) : null
      ) : (
        <Onboarding />
      )}
    </div>
  );
}
