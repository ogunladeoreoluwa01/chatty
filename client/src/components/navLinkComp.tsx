import { NavLink, useLocation } from "react-router-dom";
import React from "react";

interface NavigationLink {
  link: string;
  url: string;
  icon: React.ElementType; // Ensures the icon is a React component
}

interface NavLinkCompProps {
  navigationLinks: NavigationLink[]; // Accept navigation links as props
}

const NavLinkComp: React.FC<NavLinkCompProps> = ({ navigationLinks }) => {
  const location = useLocation();

  return (
    <section className="flex flex-col items-center justify-center space-y-3 w-full">
      {navigationLinks.map((navLink, index) => {
        const isActive =
          navLink.url === "/"
            ? location.pathname === navLink.url
            : location.pathname.startsWith(navLink.url);

        return (
          <NavLink
            key={index}
            to={navLink.url}
            className={`group  flex justify-center items-center p-[0.3rem] rounded-md drop-shadow-xl font-semibold transition-all  ${
              isActive
                ? "bg-primary scale-[1.02] rounded-[0.5rem] text-foreground border-2 border-[rgb(28,28,28)] dark:border-[rgb(240,249,255)] dark:shadow-[.10rem_.10rem_0rem_-0.0625rem_rgb(240,249,255)] shadow-[.10rem_.10rem_0rem_-0.0625rem_rgb(28,28,28)]"
                : "hover:translate-y-[1.5px]  hover:rounded-[0.5rem] hover:bg-primary hover:text-foreground  hover:shadow-[.10rem_.10rem_0rem_-0.0625rem_rgb(28,28,28)] hover:border-2 border-[rgb(28,28,28)] dark:border-[rgb(240,249,255)]  dark:hover:shadow-[.10rem_.10rem_0rem_-0.0625rem_rgb(240,249,255)]  "
            }`}
          >
            <navLink.icon className="w-6 h-6" />
          </NavLink>
        );
      })}
    </section>
  );
};

export default NavLinkComp;