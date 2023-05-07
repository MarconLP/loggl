import { InboxIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const projects = [
    {
      name: "Snapify",
      channels: ["purchases", "feature usages", "failures"],
    },
    {
      name: "Loggl",
      channels: ["purchases", "feature usages", "failures"],
    },
    {
      name: "Tablane",
      channels: ["purchases", "feature usages", "failures"],
    },
  ];

  return (
    <div className="w-[220px] flex-shrink-0 border-r border-[#E7E9EB]">
      <div className="flex h-[62px] items-center border-b border-[#E7E9EB]">
        <span className="ml-4">Loggl</span>
      </div>
      <div className="px-3 pt-3 text-[13px]">
        <div>
          <div className="my-[1px] flex h-[27px] cursor-pointer flex-row items-center rounded pl-2 transition-colors hover:bg-[#f1f3f9]">
            <div className="mr-2 h-4 w-4">
              <InboxIcon />
            </div>
            <span className="font-medium">Feed</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex h-6 cursor-pointer items-center rounded-md px-2 transition-colors hover:bg-[#f1f3f9]">
            <span className="text-xs font-medium text-[#6b6f76]">
              Your Projects
            </span>
          </div>
          <div className="mt-1 flex flex-col">
            {projects.map(({ name, channels }) => (
              <div key={name} className="">
                <div className="flex h-7 cursor-pointer items-center rounded-md px-2 pl-4 transition-colors hover:bg-[#f1f3f9]">
                  <span className="text-[13px] font-medium text-[#282A30]">
                    {name}
                  </span>
                </div>
                {channels.map((x) => (
                  <div
                    key={x}
                    className="flex h-7 cursor-pointer items-center rounded-md pl-6 pr-2 transition-colors hover:bg-[#f1f3f9]"
                  >
                    <span className="text-[13px] font-medium text-[#3c4149]">
                      # {x}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
