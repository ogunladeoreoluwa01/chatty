import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { GiBookmark, GiCrystalEye } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface detailCardProp {
  mangaTitle: string;
  mangaId: string;
  mangaImage: string;
  mangaViews: string;
  mangaDescription: string;
  mangaLatestChapter: string;
  isNew: boolean;
}
const DisplayCardComp: React.FC<detailCardProp> = ({
  mangaTitle = "With unmaintained red hair and shabby clothes",
  mangaId = "demo-123",
  mangaImage = "https://ww6.mangakakalot.tv/mangaimage/manga-nl991268.jpg",
  mangaViews = "123",
  mangaDescription = "With unmaintained red hair and shabby clothes, Marie, the baron's daughter, has been treated like a servant all her life. Count Granado, the country's richest man, who is said to be a difficult misogynist, falls in love with her at first sight. However, due to a misunderstanding, Count Granado proposes to her sister Anastasia, who looks like a princess, instead of the ragged Marie. A very popular work from \"Become a Novelist\"! Marie's Cinderella story that began with a hero's misunderstanding! / Zutaboro Reijou wa Ane no Moto Konyakusha ni Dekiai Sareru",
  mangaLatestChapter = "chapter 1000",
  isNew = true,
}) => {
  const [sliceDesc, setSliceDesc] = useState<string>("");
  const [sliceTitle, setSliceTitle] = useState<string>("");

  useEffect(() => {
    if (mangaDescription.length > 300) {
      setSliceDesc(mangaDescription.slice(0, 300) + "...");
    }
    if (mangaTitle.length > 40) {
      setSliceTitle(mangaTitle.slice(0, 40) + "...");
    }else{
       setSliceTitle(mangaTitle);
    }
  }, [mangaDescription, mangaTitle]);

  return (
    <Link to={`/manga-details/${mangaId}`}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="w-[9.6875rem] p-0  transition-all duration-150 ease-linear group ">
            <CardContent className="p-0 w-full bg-black overflow-hidden h-[12.25rem] rounded-[0.5rem] relative">
              <img
                src={mangaImage}
                alt={mangaTitle}
                className="w-full transition-all duration-150 ease-linear h-full object-cover opacity-90 hover:opacity-100 rounded-[0.5rem] group-hover:scale-110"
                fetchPriority="high"
                loading="lazy"
              />
              <div  className="absolute font-bold py-auto text-xs top-0 px-1 bg-primary right-0 rounded-tr-[0.5rem] rounded-bl-[0.5rem] flex items-center justify-center min-w-[6.375rem]  max-w-[8rem] z-20 h-[1.1rem] truncate overflow-hidden whitespace-nowrap text-ellipsis ">
                {isNew && "New!"}{" "}
                {mangaLatestChapter.replace("chapter", "Ch").trim().slice(0,26)}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start w-[9.6875rem] px-0 py-1 border-none">
              <CardDescription className="leading-[0.9rem]">
                {sliceTitle}
              </CardDescription>
            </CardFooter>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="  min-h-[5.625rem] bg-primary retro-box-shadow ">
          <h1 className="font-black  capitalize w-full leading-[0.9rem] h-fit">
            {mangaTitle}
          </h1>
          <Separator className="bg-popover-foreground my-1" />
          <p className="font-black flex items-center gap-1  text-sm capitalize w-full leading-[0.9rem] h-fit">
            <GiBookmark /> {mangaLatestChapter.replace("chapter", "Ch").trim()}
          </p>
          <Separator className="bg-popover-foreground my-1" />
          <p className="text-xs font-bold leading-[0.7rem] mb-1">Description</p>
          <p className="text-xs leading-[0.7rem]">{sliceDesc}</p>
          <Separator className="bg-popover-foreground my-1" />
          <p className="font-black flex items-center justify-end gap-1  text-sm capitalize w-full leading-[0.9rem] h-fit">
            <GiCrystalEye />
            {mangaViews} .views
          </p>
        </HoverCardContent>
      </HoverCard>
    </Link>
  );
};

export default DisplayCardComp;
