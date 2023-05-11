import { Fragment, useState, type SyntheticEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InboxIcon } from "@heroicons/react/24/solid";

import { api } from "~/utils/api";

interface Props {
  emptyState: boolean;
}

export default function NewProjectDialog({ emptyState = false }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const utils = api.useContext();
  const createProjectMutation = api.project.create.useMutation({
    onSuccess: async () => {
      await utils.project.get.invalidate();
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    createProjectMutation.mutate({
      name,
    });

    setName("");
    setOpen(false);
  };

  return (
    <>
      {emptyState ? (
        <div
          className="flex h-full flex-col items-center justify-center"
          onClick={() => setOpen(true)}
        >
          <InboxIcon className="h-16 w-16" />
          <span className="text-palette-900 mt-2 text-base font-medium leading-6 md:text-base">
            No projects yet
          </span>
          <button className="mt-6 inline-flex items-center rounded-md border border-transparent bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#404040] focus:outline-none">
            + Create Project
          </button>
        </div>
      ) : (
        <div
          onClick={() => setOpen(true)}
          className="flex h-6 w-6 items-center justify-center"
        >
          <span>+</span>
        </div>
      )}
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
                        Create new project
                      </label>
                      <div className="mt-2">
                        <input
                          value={name}
                          onChange={(e) => setName(e.currentTarget.value)}
                          id="title"
                          name="title"
                          placeholder="Project name"
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
