import HomeCarosel from "@/components/homePageCarosel";
import React, { useEffect } from "react";
import { useQuery,useInfiniteQuery} from "@tanstack/react-query";
import DisplayCardComp from "./displayCardComp";
import { DisplayCardLoader } from "./displayCardLoader";
import fetchMangaList from "@/api/mangaHookAPiServices/getmanga";
import { useInView } from "react-intersection-observer";

interface mangaSectionProp{
    category:string;
}

const MangaSection: React.FC<mangaSectionProp> = ({ category: category = "newest" }) => {
//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ["mangaList",category],
//     queryFn: () => fetchMangaList({ page:2, type: category }),
//   });
  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["mangaList", category],
    queryFn: ({ pageParam = 2 }) => {
      return fetchMangaList({
        page: pageParam,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      // Get the current number of pages fetched
      const currentPage = allPages.length;

      // Check if there are more pages to fetch
      return currentPage < lastPage.metaData.totalPages
        ? currentPage + 1
        : undefined;
    },
  });

console.log(data)

 const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);




 let cardIndex = 0;


  return (
    <>
      <div className=" overflow-hidden mx-auto w-[100vw] p-3 flex flex-col items-center">
        <h1 className="text-xl w-[320px] mb-2 md:w-[665px] lg:w-[90vw] text-primary font-black capitalize">
          All Books
        </h1>
        <div className=" w-[320px]  md:w-[665px] lg:w-[90vw] flex items-center justify-center">
          <div className="flex gap-2 flex-wrap   items-start">
            {isFetching && !isFetchingNextPage
              ? // Show loaders when fetching initial data and not fetching next page
                Array(10)
                  .fill(0)
                  .map((_, index) => <DisplayCardLoader key={index} />)
              : data?.pages.map((page, i) => (
                  <React.Fragment key={i}>
                    {page.mangaList.map((manga, index) => {
                      cardIndex += 1; // Increment the post index
                      const isRef = cardIndex % 10 === 3; // Add ref to every 9th, 19th, 29th, etc., post
                      return (
                        <span key={index} ref={isRef ? ref : null}>
                          <DisplayCardComp
                            isNew={false}
                            mangaTitle={manga.title}
                            mangaId={manga.id}
                            mangaImage={manga.image}
                            mangaViews={manga.view}
                            mangaDescription={manga.description}
                            mangaLatestChapter={manga.chapter}
                          />
                        </span>
                      );
                    })}
                  </React.Fragment>
                ))}

            {isFetchingNextPage &&
              Array(15)
                .fill(0)
                .map((_, index) => <DisplayCardLoader key={index} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default MangaSection;