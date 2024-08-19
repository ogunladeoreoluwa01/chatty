import HomeCarosel from "@/components/homePageCarosel";
import MangaSection from "@/components/MangaSection";
import React from "react";


const HomePage: React.FC = () => {
  return (
    <>
      <HomeCarosel />
      <div className="flex flex-col items-center gap-2 justify-center w-full overflow-hidden">
        <MangaSection category="newest" />
        
      </div>
    </>
  );
};

export default HomePage;