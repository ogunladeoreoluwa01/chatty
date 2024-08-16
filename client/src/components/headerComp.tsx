import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TiUser } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import { GiTrophyCup } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import { useAccessStore, useRefreshStore } from "@/stores/userStore";
import { ModeToggle } from "@/components/mode-toggle";


interface HeaderProp {
  userName:string;
  userProfileImg:string;

}


const HeaderComp: React.FC<HeaderProp> = ({
  userName = "Shadcn",
  userProfileImg = "https://github.com/shadcn.png",
}) => {
  const navigate = useNavigate();

  const accessToken = useAccessStore((state) => state.accessToken);
  const removeAccessToken = useAccessStore((state) => state.removeAccessToken);

  const refreshToken = useRefreshStore((state) => state.refreshToken);
  const removeRefreshToken = useRefreshStore(
    (state) => state.removeRefreshToken
  );

  const logOut = () => {
    removeAccessToken();
    removeRefreshToken();
    navigate("/login");
  };
  return (
    <header className="w-full sticky z-30 top-0 flex justify-between px-2 md:px-4 lg:px-6">
      {" "}
      <Link
        to={"/"}
        className="font-black text-primary text-xl flex items-center justify-between "
      >
        YUKI{" "}
      </Link>{" "}
      <div className="flex items-center gap-2">
        {!refreshToken ? (
          <Button
            variant="CTA"
            className="text-foreground shadow-[.18rem_.18rem_0rem_-0.0625rem_rgb(28,28,28)] hover:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)] border-2 border-[rgb(28,28,28)] dark:shadow-[.18rem_.18rem_0rem_-0.0625rem_rgb(240,249,255)] dark:hover:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  dark:border-[rgb(240,249,255)] transition-all duration-150 ease-linear focus:font-extrabold"
          >
            Log In
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="  rounded-[0.5rem] bg-primary p-[0.7px] shadow-[.18rem_.18rem_0rem_-0.0625rem_rgb(28,28,28)] hover:shadow-[.20rem_.20rem_0rem_-0.0625rem_rgb(28,28,28)] border-2 border-[rgb(28,28,28)] dark:shadow-[.18rem_.18rem_0rem_-0.0625rem_rgb(240,249,255)] dark:hover:shadow-[.20rem_.20rem_0rem_-0.0625rem_rgb(240,249,255)]  dark:border-[rgb(240,249,255)] transition-all duration-150 ease-linear focus:font-extrabold">
                <AvatarImage
                  src={userProfileImg}
                  className="rounded-[0.35rem]"
                />
                <AvatarFallback className="   bg-primary">
                  {userName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className=" w-56 bg-primary shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  border-2 border-[rgb(28,28,28)] dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]   dark:border-[rgb(240,249,255)]"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="focus:font-black transition-all focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)]  ">
                  Profile
                  <DropdownMenuShortcut>
                    <TiUser />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:font-black transition-all focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)]  ">
                  Settings
                  <DropdownMenuShortcut>
                    <IoMdSettings />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="focus:font-black transition-all focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)]  ">
                Achivements
                <DropdownMenuShortcut>
                  <GiTrophyCup />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:font-black transition-all focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)]  "
                disabled
              >
                Support
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled
                className="focus:font-black transition-all focus:bg-primary focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)]  "
              >
                Coming Soon
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logOut();
                }}
                className=" mb-1 focus:bg-destructive focus:font-black transition-all focus:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)]  focus:border-2 border-[rgb(28,28,28)] focus:dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)]  focus:dark:border-[rgb(240,249,255)]"
              >
                Log out
                <DropdownMenuShortcut>
                  <TbLogout />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ModeToggle />
      </div>
    </header>
  );
};
export default HeaderComp
