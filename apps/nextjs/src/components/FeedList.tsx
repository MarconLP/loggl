interface Props {
  events: {
    event: string;
    description: string;
    timestamp: number;
    icon: string;
  }[];
}

export default function FeedList({ events }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      {events.map(({ event, description, timestamp, icon }) => (
        <div
          key={timestamp}
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
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
