import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { createToast } from "vercel-toast";

import { api } from "~/utils/api";

export default function Onboarding() {
  const { update } = useSession();
  const utils = api.useContext();
  const { data: projects } = api.project.get.useQuery();
  const [activeStep, setActiveStep] = useState<{ name: string; id: number }>({
    name: "create-project",
    id: 1,
  });
  const { data: apiKeys } = api.account.getApiKeys.useQuery();
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    if (projects && projects.length >= 1) {
      setActiveStep({
        name: "create-api-key",
        id: 2,
      });

      if (apiKeys && apiKeys.length >= 1) {
        setActiveStep({
          name: "publish-event",
          id: 3,
        });
      }
    }
  }, [projects, apiKeys]);

  const createProjectMutation = api.project.create.useMutation({
    onSuccess: async () => {
      await utils.project.get.invalidate();
      setActiveStep({ name: "create-api-key", id: 2 });
    },
  });

  const completeOnboardingMutation = api.account.completeOnboarding.useMutation(
    {
      onSuccess: () => {
        void update();
      },
    },
  );

  const createApiKeyMutation = api.account.createApiKey.useMutation({
    onSuccess: async () => {
      await utils.account.getApiKeys.invalidate();
      setActiveStep({ name: "publish-event", id: 3 });
    },
  });

  const handleTokenCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createApiKeyMutation.mutate({ name: "default key" });
  };

  const handleCopyProjectName = () => {
    void navigator.clipboard.writeText(
      projects && projects.length > 0 ? projects[0]?.name ?? "" : "",
    );
    createToast("Copied project name", { timeout: 3000 });
  };

  const handleCopyToken = () => {
    void navigator.clipboard.writeText(
      apiKeys && apiKeys[0] ? apiKeys[0].token : "",
    );
    createToast("Copied API token", { timeout: 3000 });
  };

  const handleOnboardingComplete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    completeOnboardingMutation.mutate();
  };

  const handleCreateProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProjectMutation.mutate({
      name: projectName,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value.replace(/[^a-z0-9-]+/g, ""));
  };

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto">
      <div className="px-6 pt-4 md:px-6">
        <div className="space-y-5 pt-2 md:space-y-3">
          {[
            {
              step: "create-project",
              id: 1,
              title: "To start, create your first project",
              description: "Projects help you organize your events",
              actions: (
                <form
                  className="sm:flex sm:items-center"
                  onSubmit={handleCreateProject}
                >
                  <div className="w-full sm:max-w-xs">
                    <input
                      value={projectName}
                      onChange={handleChange}
                      type="text"
                      name="project"
                      id="project"
                      className="block w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-[#171717] placeholder-[#d4d4d4] outline-none focus:border-[#e5e5e5] focus:outline-none focus:ring-0 active:outline-none sm:text-sm"
                      placeholder="my-website"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#171717] px-4 py-2 font-medium text-white focus:outline-none sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Create
                  </button>
                </form>
              ),
              postItems: (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="sm:flex sm:items-center"
                >
                  <div className="w-full sm:max-w-xs">
                    <input
                      value={
                        projects && projects.length > 0
                          ? projects[0]?.name ?? ""
                          : ""
                      }
                      readOnly
                      type="text"
                      name="project"
                      id="project"
                      className="block w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-[#171717] placeholder-[#d4d4d4] outline-none focus:border-[#e5e5e5] focus:outline-none focus:ring-0 active:outline-none sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={handleCopyProjectName}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#171717] px-4 py-2 font-medium text-white focus:outline-none sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Copy
                  </button>
                </form>
              ),
            },
            {
              step: "create-api-key",
              id: 2,
              title: "Generate your API Token",
              description: "Tokens are required for publishing events",
              actions: (
                <form
                  onSubmit={handleTokenCreate}
                  className="sm:flex sm:items-center"
                >
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#171717] px-4 py-2 font-medium text-white focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Generate a Token
                  </button>
                </form>
              ),
              postItems: (
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="sm:flex sm:items-center"
                >
                  <div className="w-full sm:max-w-xs">
                    <input
                      value={apiKeys && apiKeys[0] ? apiKeys[0].token : ""}
                      readOnly
                      type="text"
                      name="project"
                      id="project"
                      className="block w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-[#171717] placeholder-[#d4d4d4] outline-none focus:border-[#e5e5e5] focus:outline-none focus:ring-0 active:outline-none sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={handleCopyToken}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#171717] px-4 py-2 font-medium text-white focus:outline-none sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Copy
                  </button>
                </form>
              ),
            },
            {
              step: "publish-event",
              id: 3,
              title: "Publish your first event",
              description: "Code or no code, we got you covered",
              actions: (
                <div className="sm:flex sm:items-center">
                  <Link
                    href="/docs"
                    target="_blank"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#171717] px-4 py-2 font-medium text-white focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Documentation
                  </Link>
                </div>
              ),
              postItems: <span>asdf loggl asdf</span>,
            },
            {
              step: "done",
              id: 4,
              title: "You're all set!",
              description: "Happy event tracking",
              actions: (
                <form
                  onSubmit={handleOnboardingComplete}
                  className="sm:flex sm:items-center"
                >
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-[#171717] px-4 py-2 font-medium text-white focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Continue
                  </button>
                </form>
              ),
              postItems: null,
            },
          ].map(({ id, step, title, description, actions, postItems }) => (
            <div
              key={id}
              className={`animate-all flex flex-col space-y-1 duration-500 md:flex-row md:space-x-5 md:space-y-0 ${
                activeStep.name === step || (activeStep.id === 3 && id === 4)
                  ? "opacity-100"
                  : activeStep.id > id
                  ? "opacity-50"
                  : "opacity-[15%]"
              }`}
              style={{ scrollMargin: "100px" }}
            >
              <div className="flex flex-col space-y-3 md:items-center">
                <div className="items-center justify-center rounded-full text-[#171717] md:flex md:h-11 md:w-11 md:shrink-0 md:bg-[#fafafa]">
                  <span className="font-semibold">{id}</span>
                </div>
                <div
                  className={`hidden h-full w-[0px] border-l-2 border-dashed border-[#e5e5e5] md:block ${
                    id === 4 ? "!hidden" : ""
                  }`}
                />
              </div>
              <div className="w-full space-y-1 pb-4 pt-1.5 md:pb-6">
                <p className="text-lg font-medium text-[#171717]">{title}</p>
                <p className="font-base text-sm text-[#737373] md:text-base">
                  {description}
                </p>
                <div
                  className={`pt-3 ${
                    activeStep.id >= id || (activeStep.id === 3 && id === 4)
                      ? ""
                      : "hidden"
                  }`}
                >
                  <div className="space-y-2.5">
                    {activeStep.id === id || (activeStep.id === 3 && id === 4)
                      ? actions
                      : postItems}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[150px]" />
    </div>
  );
}
