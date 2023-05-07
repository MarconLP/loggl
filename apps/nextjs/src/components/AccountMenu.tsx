import { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";

export default function AccountMenu() {
  const items = [
    {
      name: "Settings",
      props: {
        onClick: () => {
          console.log("Settings");
        },
      },
    },
    {
      name: "Sign out",
      props: {
        onClick: () => {
          void signOut();
        },
      },
    },
  ];

  return (
    <Menu as="div" className="relative w-full">
      <div>
        <Menu.Button className="flex h-[56px] w-full cursor-pointer flex-row items-center gap-x-4 border-t border-[#E7E9EB] px-6 py-3 hover:bg-[#f1f3f9]">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              width={32}
              height={32}
              alt="profile icon"
              unoptimized
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div>
          <span className="font-semibold">Marcus</span>
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
