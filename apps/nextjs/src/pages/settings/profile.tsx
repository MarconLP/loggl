import { useSession } from "next-auth/react";

import Sidebar from "~/components/settings/Sidebar";

export default function SettingsPage() {
  const { data: session } = useSession();

  if (!session) return <span>please go log in</span>;
  return (
    <div className="flex h-screen flex-row text-sm">
      <Sidebar />
      <div className="grow">profile content</div>
    </div>
  );
}
