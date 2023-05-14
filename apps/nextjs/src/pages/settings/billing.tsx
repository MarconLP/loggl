import { createToast } from "vercel-toast";

import SettingsLayout from "~/components/settings/SettingsLayout";

export default function BillingSettingsPage() {
  return (
    <SettingsLayout>
      <div className="mt-16 flex flex-col border-b border-[#E7E9EB] pb-8">
        <span className="mb-1 text-xl font-bold leading-5 tracking-wide text-[#111827]">
          Billing
        </span>
        <span className="text-sm text-[#374151]">
          Manage all things billing
        </span>
      </div>
      <div className="mt-8">
        <div className="flex flex-col items-start justify-between md:flex-row">
          <div className="flex flex-col text-[#374151]">
            <span className="font-medium">
              View and manage your billing details
            </span>
            <span>
              View and edit your billing details, as well as cancel your
              subscription.
            </span>
          </div>
          <div>
            <button
              onClick={() =>
                createToast("Not implemented yet", {
                  timeout: 3000,
                })
              }
              className="mt-4 rounded-md bg-[#292929] px-4 py-2 text-white md:mt-0"
            >
              Billing portal
            </button>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}
