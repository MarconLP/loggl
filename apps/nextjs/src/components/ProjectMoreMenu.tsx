import { Fragment } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";

import { api } from "~/utils/api";

interface Props {
  projectId: string;
}

export default function ProjectMoreMenu({ projectId }: Props) {
  const router = useRouter();
  const utils = api.useContext();

  const items = [
    {
      name: "Delete",
      icon: <TrashIcon />,
      props: {
        onClick: () => {
          deleteProjectMutation.mutate({ id: projectId });
        },
      },
    },
  ];

  const deleteProjectMutation = api.projects.delete.useMutation({
    onMutate: async () => {
      await utils.projects.get.cancel();
      const previousValue = utils.projects.get.getData();
      return { previousValue };
    },
    onError: (err, _, context) => {
      if (context?.previousValue) {
        utils.projects.get.setData(undefined, context.previousValue);
      }
      console.error(err.message);
    },
    onSettled: () => {
      void utils.projects.get.invalidate();
      void router.push("/dashboard/feed");
    },
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex h-6 w-6 items-center justify-center">
          <EllipsisHorizontalIcon className="h-4 w-4" />
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
