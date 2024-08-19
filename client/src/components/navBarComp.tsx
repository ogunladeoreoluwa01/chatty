import { Link } from "react-router-dom";
import NavLinkComp from "./navLinkComp";
import { GoHomeFill } from "react-icons/go";

import {
  GiCompass,
  GiBookmarklet,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";





const NavBarComp: React.FC = () => {

  const navigationLinks = [
    { link: "home", url: "/home", icon: GoHomeFill },
    {
      link: "explore",
      url: `/manga-list`,
      icon: GiCompass,
    },
    {
      link: "placeholder",
      url: `/manga-list`,
      icon: GiPerspectiveDiceSixFacesRandom,
    },
    {
      link: "bookmarks",
      url: `/bookmark`,
      icon: GiBookmarklet,
    },
  ];
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="md:w-[350px] h-[3.5rem]  w-[100dvw] md:rounded-[0.5rem] fixed bottom-0 md:bottom-[0.6rem] left-1/2 -translate-x-[50%] z-40  bg-background shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)] border-t-2  md:border-2 border-[rgb(28,28,28)] dark:border-[rgb(240,249,255)] dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]    text-muted-foreground flex items-center justify-center py-[0.35rem] px-5">
        <ul className="flex gap-5 justify-center items-center  md:w-[350px] w-[100dvw]">
          {navigationLinks.map((navLink, index) => {
            return (
              <li key={index} className="w-full text-center self-center">
                <NavLinkComp navigationLinks={[navLink]} />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default NavBarComp;

