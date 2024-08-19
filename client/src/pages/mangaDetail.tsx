import { useParams } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GiFountainPen, GiCrystalEye } from "react-icons/gi";
import { IoMdBookmark } from "react-icons/io";
import { IoList } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";
import { MangaDetail } from "@/types/types";
import {demoManga} from "./demomanga"
import  MangaDetailInfoComp from "@/components/mangaDetailsInfoComp";
import { useQuery } from "@tanstack/react-query";
import fetchMangaDetails from "@/api/mangaHookAPiServices/getMangaDetail";
import { Link } from "react-router-dom";

const MangaDetailPage: React.FC= () => {
    const { mangaId } = useParams<{ mangaId: string }>();
   
    
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["mangaDetail", mangaId],
    queryFn: () => fetchMangaDetails({ mangaId }),
  });

  const chapterList = data?.chapterList



  return (
    <>
      <section className="w-[98%] flex flex-col md:w-[70%] lg:w-[60%]  mx-auto">
        <MangaDetailInfoComp manga={data} isBookmarked={true} />

        <section className="flex flex-col items-start gap-1 w-full mt-[9rem] mx-1">
          <h1 className="font-black text-primary">Chapters</h1>
          <Link
            to={`/read-manga/${mangaId}`}
            className="w-full p-2 flex items-center justify-between hover:retro-box-shadow hover:bg-popover transition-all duration-300 ease-linear bg-opacity-40"
          >
            <section className="flex items-start gap-2 ">
              <div className="min-w-10 h-10 bg-primary  flex items-center justify-center rounded-[0.5rem] text-foreground border-2 border-foreground ">
                1
              </div>
              <div className=" flex  flex-col items-start rounded-[0.5rem] text-foreground  ">
                <p className="leading-[15px] text-lg font-black">ch</p>
                <p className="leading-[10px]">ch name</p>
              </div>
            </section>

            <div className="h-10  flex items-end rounded-[0.5rem] text-foreground  text-sm font-medium  ">
              date
            </div>
          </Link>
        </section>
      </section>
    </>
  );
};

export default MangaDetailPage;