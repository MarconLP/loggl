import { type RouterOutputs } from "@acme/api";

interface Props {
  notifications: RouterOutputs["feed"]["get"];
}

export default function FeedList({ notifications }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
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
    </div>
  );
}
