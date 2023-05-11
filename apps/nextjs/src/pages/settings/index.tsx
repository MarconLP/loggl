import { useEffect } from "react";
import { useRouter } from "next/router";

import LoadingSpinner from "~/components/LoadingSpinner";

export default function Settings() {
  const router = useRouter();

  useEffect(() => {
    void router.push("/settings/profile");
  }, [router]);

  return (
    <div className="mt-8 flex w-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
