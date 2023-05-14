import { useEffect, useState } from "react";
import posthog from "posthog-js";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(
      !(posthog.has_opted_out_capturing() || posthog.has_opted_in_capturing()),
    );
  }, []);

  const acceptCookies = () => {
    posthog.opt_in_capturing();
    setShow(false);
  };

  const declineCookies = () => {
    posthog.opt_out_capturing();
    setShow(false);
  };

  if (!show) return <></>;
  return (
    <div className="cookie-banner fixed bottom-0 z-50 flex h-[130px] w-full flex-col items-center justify-between bg-[#414042] p-4 px-8 text-sm text-white md:h-[80px] md:flex-row md:px-32">
      <p>
        We use tracking cookies to understand how you use the product and help
        us improve it.
      </p>
      <div className="flex-shrink-0 md:ml-8">
        <button
          type="button"
          onClick={acceptCookies}
          className="mr-4 rounded bg-[#475eb8] p-3"
        >
          Accept cookies
        </button>
        <button type="button" onClick={declineCookies} className="">
          Decline cookies
        </button>
      </div>
    </div>
  );
}
