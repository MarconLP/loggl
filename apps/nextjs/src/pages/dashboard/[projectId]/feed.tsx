import type { NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import FeedList from "~/components/FeedList";
import LoadingSpinner from "~/components/LoadingSpinner";
import Sidebar from "~/components/Sidebar";

const Feed: NextPage = () => {
  const { data: notifications, isLoading } = api.feed.get.useQuery();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-row overflow-auto text-[#3c4149]">
        <Sidebar />
        <div className="flex w-full flex-col">
          <div className="flex h-[62px] items-center border-b border-[#E7E9EB]">
            <span className="ml-4 font-bold">Feed</span>
          </div>
          {!isLoading && notifications ? (
            <FeedList notifications={notifications} />
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
