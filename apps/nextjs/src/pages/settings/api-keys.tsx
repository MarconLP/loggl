import { TrashIcon } from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/24/solid";
import { CopyIcon } from "@radix-ui/react-icons";
import { usePostHog } from "posthog-js/react";
import { createToast } from "vercel-toast";

import { api } from "~/utils/api";
import NewApiKeyMenu from "~/components/settings/NewApiKeyMenu";
import SettingsLayout from "~/components/settings/SettingsLayout";

export default function ApiKeysSettingsPage() {
  const { data: apiKeys } = api.account.getApiKeys.useQuery();
  const posthog = usePostHog();
  const utils = api.useContext();
  const deleteApiMutation = api.account.deleteApiKey.useMutation({
    onSuccess: async () => {
      await utils.account.getApiKeys.invalidate();
    },
  });

  const handleCopy = (token: string) => {
    void navigator.clipboard.writeText(token);
    createToast("Copied API Token", {
      timeout: 3000,
    });

    posthog?.capture("copied api key");
  };

  const handleDelete = (id: string) => {
    deleteApiMutation.mutate({ id });
  };

  return (
    <SettingsLayout>
      <div className="mt-16 flex flex-col border-b border-[#E7E9EB] pb-8">
        <span className="mb-1 text-xl font-bold leading-5 tracking-wide text-[#111827]">
          API keys
        </span>
        <span className="text-sm text-[#374151]">
          API keys allow other apps to communicate with Loggl.net
        </span>
      </div>
      <div className="mt-8">
        {apiKeys && apiKeys.length !== 0 ? (
          <div className="flex flex-col items-start">
            <div className="mb-8 mt-6 w-full">
              {apiKeys?.map(({ id, name, token }) => (
                <div
                  key={name}
                  className="border border-t-0 first:rounded-t-md first:border-t last:rounded-b-md"
                >
                  <div className="flex w-full justify-between p-4">
                    <div className="flex items-center">
                      <p className="font-medium">{name}</p>
                    </div>
                    <div className="flex flex-row">
                      <button
                        onClick={() => handleCopy(token)}
                        className="flex h-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-md !p-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#f9fafb]"
                      >
                        <CopyIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="flex h-9 min-h-[36px] min-w-[36px] items-center justify-center rounded-md !p-2 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#f9fafb]"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <NewApiKeyMenu />
          </div>
        ) : (
          <div className="min-h-80 border-subtle flex w-full flex-col items-center justify-center rounded-md border border-dashed p-7 lg:p-20">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#e5e7eb] ">
              <LinkIcon className="inline-block h-10 w-10 stroke-[1.3px]" />
            </div>
            <div className="flex max-w-[420px] flex-col items-center">
              <h2 className="text-semibold font-cal text-emphasis mt-6 text-center text-xl">
                Create your first API key
              </h2>
              <div className="text-default mb-8 mt-3 text-center text-sm font-normal leading-6">
                API keys allow other apps to communicate with Loggl.net
              </div>
              <NewApiKeyMenu />
            </div>
          </div>
        )}
      </div>
    </SettingsLayout>
  );
}
