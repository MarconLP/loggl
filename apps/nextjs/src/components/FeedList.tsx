import { SignalSlashIcon } from "@heroicons/react/24/solid";

import { type RouterOutputs } from "@acme/api";

interface Props {
  notifications: RouterOutputs["feed"]["getAll"];
}

export default function FeedList({ notifications }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-start">
      {notifications.notifications.map(
        ({ id, event, description, timestamp, icon }) => (
          <div
            key={id}
            className="mt-6 flex w-[480px] flex-row rounded-lg border border-[#00000014] p-6 text-[#474747]"
          >
            <div className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#00000014] bg-[#dad1bf1a]">
              {icon}
            </div>
            <div className="flex grow flex-col">
              <div>
                <span className="font-bold">{event}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>{description}</span>
                <span>{new Date(timestamp).getTime()}</span>
              </div>
            </div>
          </div>
        ),
      )}
      {notifications.notifications.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <SignalSlashIcon className="h-16 w-16" />
          <span className="text-palette-900 mt-2 text-base font-medium leading-6 md:text-base">
            No events found
          </span>
        </div>
      )}
    </div>
  );
}
