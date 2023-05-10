import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Settings() {
  const router = useRouter();

  useEffect(() => {
    void router.push("/settings/profile");
  }, [router]);

  return (
    <div>
      <p>This page will redirect to /settings/profile.</p>
    </div>
  );
}
