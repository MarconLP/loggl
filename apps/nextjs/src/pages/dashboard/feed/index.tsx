import type { NextPage } from "next";
import Head from "next/head";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";

import { api, type RouterOutputs } from "~/utils/api";
import { sidebarOpenAtom } from "~/utils/atoms";
import FeedList from "~/components/FeedList";
import LoadingSpinner from "~/components/LoadingSpinner";
import Sidebar from "~/components/Sidebar";

const Feed: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const { data, fetchNextPage, isLoading } = api.feed.getAll.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const notifications =
    data?.pages.reduce(
      (acc: RouterOutputs["feed"]["getAll"]["notifications"], currentPage) => {
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
        <title>Loggl</title>
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
            <div className="ml-auto mr-4 flex hidden max-h-[35px] flex-col items-center justify-center rounded px-2 py-2 text-sm text-[#6c6685]">
              <span>{1 + 1}/5.000 events</span>
              <div className="mt-1 h-[3px] w-full rounded-full bg-gray-200">
                <div
                  className={`h-[3px] w-[45%] rounded-full ${
                    9 >= 7 ? "bg-red-600" : "bg-blue-600"
                  }`}
                  style={{
                    width: "1" + "0%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          {!isLoading && notifications ? (
            <>
              <FeedList
                fetchNextPage={fetchNextPage}
                notifications={notifications}
              />
            </>
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
