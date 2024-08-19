import React from "react";
import { GiFountainPen, GiCrystalEye } from "react-icons/gi";
import { IoMdBookmark } from "react-icons/io";
import { IoList } from "react-icons/io5";
import { Skeleton } from "@/components/ui/skeleton";
import { MangaDetail } from "@/types/types";

interface MangaDetailInfoCompProps {
  manga: MangaDetail | undefined;
  isBookmarked: boolean;
}

const MangaDetailInfoComp: React.FC<MangaDetailInfoCompProps> = ({
  manga,
  isBookmarked,
}) => {
  return (
    <>
      {manga ? (
        <section className="w-full relative">
          <div className="bg-black w-full h-[9.375rem] md:h-[11.375rem] rounded-[0.5rem] lg:h-[13.375rem] border-2 border-foreground retro-box-shadow ">
            <img
              className="w-full h-full object-cover opacity-30 blur-[2px] rounded-[0.5rem] "
              src={manga.imageUrl}
              alt={manga.name}
            />
          </div>
          <div
            className={`${
              isBookmarked && "bg-primary text-white border-white"
            }transition-all duration-300 ease-in text-[#e2e8f0] hover:text-white hover:scale-105 hover:border-white h-[32px] w-[32px] flex items-center justify-center text-lg rounded-full border-2  absolute z-10 top-3 right-3 hover:shadow-[.12rem_.12rem_0rem_-0.025rem_rgb(240,249,255)]  hover:bg-primary  border-[rgb(240,249,255)] `}
          >
            <IoMdBookmark />
          </div>
          <section className="flex items-end absolute top-[35%] gap-2 z-10 left-[1.15rem]">
            <div className="bg-white w-[163px] h-[230px] border-foreground border-2 rounded-[0.5rem]">
              <img
                className="w-full h-full object-cover  rounded-[0.5rem] border-foreground border-2"
                src={manga.imageUrl}
                alt={manga.name}
              />
            </div>

            <div className="flex w-[50%] md:w-[50%] lg:w-[60%] flex-col justify-between  pt-4 h-[230px]">
              <div className="w-full">
                <p className="text-lg text-white font-black  truncate  ">
                  {manga.name}
                </p>
                <p className="text-md flex items-center gap-1 text-[#e2e8f0] font-semibold truncate">
                  <GiFountainPen className="text-sm" /> {manga.author}
                </p>
              </div>

              <div className=" text-[0.9rem] pb-5 md:pb-2 md:text-md flex flex-col text-foreground ">
                <p className="flex items-center gap-1 trunate font-semiboold">
                  {" "}
                  <GiCrystalEye />
                  {manga.view}
                  views
                </p>
                <p className="flex items-center gap-1 trunate font-semiboold">
                  {" "}
                  <IoList />
                  {manga.chapterList.length} chapters
                </p>
                <p className="flex items-center gap-1 trunate font-semiboold">
                  {manga.status}
                </p>
              </div>
            </div>
          </section>
        </section>
      ) : (
        <section className="w-full relative">
          <Skeleton className="w-full bg-primary h-[9.375rem] md:h-[11.375rem] rounded-[0.5rem] lg:h-[13.375rem] border-2 border-foreground retro-box-shadow" />

          <section className="flex items-end absolute top-[35%] gap-2 z-10 left-[1.15rem]">
            <div className=" bg-primary w-[163px] h-[230px] border-foreground border-2 rounded-[0.5rem]">
              {" "}
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default MangaDetailInfoComp;
