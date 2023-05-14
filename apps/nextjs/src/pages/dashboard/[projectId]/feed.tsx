import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";

import { api, type RouterOutputs } from "~/utils/api";
import { sidebarOpenAtom } from "~/utils/atoms";
import FeedList from "~/components/FeedList";
import LoadingSpinner from "~/components/LoadingSpinner";
import Sidebar from "~/components/Sidebar";

const Feed: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const router = useRouter();
  const projectId = router.query.projectId;
  const { data, fetchNextPage, isLoading } =
    api.feed.getByProject.useInfiniteQuery(
      {
        limit: 10,
        projectId: projectId as string,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !!projectId,
      },
    );

  const notifications =
    data?.pages.reduce(
      (
        acc: RouterOutputs["feed"]["getByProject"]["notifications"],
        currentPage,
      ) => {
        if (currentPage.notifications) {
          return [...acc, ...currentPage.notifications];
        }

        return [...acc];
      },
      [],
    ) ?? [];

  return (
    <>
      <Head>
        <title>Create T3 App</title>
      </Head>
      <main className="flex h-screen flex-row overflow-auto text-[#3c4149]">
        <Sidebar />
        <div
          className={`flex w-full flex-col transition-all duration-200 ease-in-out ${
            sidebarOpen ? "ml-[220px]" : ""
          }`}
        >
          <div className="flex h-[62px] shrink-0 items-center border-b border-[#E7E9EB]">
            <div
              className={`ml-4 cursor-pointer p-1 ${
                sidebarOpen ? "hidden" : ""
              }`}
              onClick={() => setSidebarOpen(true)}
            >
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </div>
            <span className="ml-4 font-bold">Feed</span>
          </div>
          {!isLoading && notifications ? (
            <FeedList
              fetchNextPage={fetchNextPage}
              notifications={notifications}
            />
          ) : (
            <div className="mt-4 flex justify-center">
              <LoadingSpinner />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Feed;
