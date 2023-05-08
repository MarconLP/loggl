import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";

import { api } from "~/utils/api";

interface Props {
  notificationId: string;
}

export default function NotificationMoreMenu({ notificationId }: Props) {
  const utils = api.useContext();

  const items = [
    {
      name: "Delete",
      icon: <TrashIcon />,
      props: {
        onClick: () => {
          deleteNotificationMutation.mutate({ id: notificationId });
        },
      },
    },
  ];

  const deleteNotificationMutation = api.feed.delete.useMutation({
    onSettled: () => {
      void utils.feed.getAll.invalidate();
      void utils.feed.getByProject.invalidate();
      void utils.feed.getByChannel.invalidate();
    },
  });

  return (
    <Menu as="div" className="absolute text-left">
      <div>
        <Menu.Button className="text-md flex h-4 w-4 items-center justify-center">
          <EllipsisHorizontalIcon className="absolute h-4 w-4 opacity-0 group-hover:opacity-100" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {items.map((item) => (
              <div className="h-8" key={item.name} {...item.props}>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`mx-2 flex h-8 w-40 cursor-pointer flex-row content-center rounded-md p-2 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <div className="mr-2 flex w-4 content-center justify-center">
                        {item.icon}
                      </div>
                      <p className="leading-2 text-sm leading-4">{item.name}</p>
                    </div>
                  )}
                </Menu.Item>
              </div>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
