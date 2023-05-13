import { Fragment, useState, type SyntheticEvent } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { InboxIcon, PlusIcon } from "@heroicons/react/24/solid";
import { usePostHog } from "posthog-js/react";

import { api } from "~/utils/api";

export default function NewApiKeyMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const utils = api.useContext();
  const posthog = usePostHog();
  const createApiKeyMutation = api.account.createApiKey.useMutation({
    onSuccess: async () => {
      await utils.account.getApiKeys.invalidate();
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    createApiKeyMutation.mutate({
      name,
    });

    setName("");
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    posthog?.capture("open api-key create modal");
  };

  return (
    <>
      <div
        className="flex h-full flex-col items-center justify-center"
        onClick={handleOpen}
      >
        <button className="hover:bg-muted hover:border-emphasis focus-visible:bg-subtle focus-visible:ring-empthasis relative inline-flex h-9 items-center rounded-md border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2">
          <PlusIcon className="mr-1 h-4 w-4 stroke-[1.5px]" />
          New API key
        </button>
      </div>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmit}>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Create new API Key
                      </label>
                      <div className="mt-2">
                        <input
                          value={name}
                          onChange={(e) => setName(e.currentTarget.value)}
                          id="title"
                          name="title"
                          placeholder="API Key name"
                          type="title"
                          autoComplete="title"
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 rounded-md border border-[#d4d4d4] px-3 py-2 text-sm font-semibold shadow-sm"
                    >
                      Create
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
