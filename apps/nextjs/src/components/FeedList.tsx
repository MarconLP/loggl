import Link from "next/link";
import { SignalSlashIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { type RouterOutputs } from "@acme/api";

import { api } from "~/utils/api";
import NewProjectDialog from "~/components/NewProjectDialog";
import NotificationMoreMenu from "~/components/NotificationMoreMenu";

dayjs.extend(relativeTime);

interface Props {
  notifications: RouterOutputs["feed"]["getAll"];
}

export default function FeedList({ notifications }: Props) {
  const { data: projects } = api.project.get.useQuery();

  return (
    <div className="flex grow flex-col items-center justify-start">
      {notifications.notifications.map(
        ({ id, event, description, timestamp, icon }) => (
          <div
            key={id}
            className="group mt-6 flex w-[480px] flex-row rounded-lg border border-[#00000014] p-6 text-[#474747]"
          >
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#00000014] bg-[#dad1bf1a]">
              {icon}
            </div>
            <div className="flex grow flex-col">
              <div>
                <span className="font-bold">{event}</span>
              </div>
              <div className="flex flex-row items-end justify-between">
                <span>{description}</span>
                <div>
                  <span className="block text-xs group-hover:hidden">
                    {dayjs(timestamp).fromNow(true)}
                  </span>
                  <NotificationMoreMenu notificationId={id} />
                </div>
              </div>
            </div>
          </div>
        ),
      )}
      {projects && projects?.length <= 0 ? (
        <NewProjectDialog />
      ) : (
        notifications.notifications.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center">
            <SignalSlashIcon className="h-16 w-16" />
            <span className="text-palette-900 mb-6 mt-2 text-base font-medium leading-6 md:text-base">
              No events found
            </span>
            <Link href="https://docs.loggl.net/">
              <button className="inline-flex items-center rounded-md border border-transparent bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#404040] focus:outline-none">
                Documentation
              </button>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
