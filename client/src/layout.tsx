import React from "react";
import { useEffect,useState } from "react";
import {Outlet} from "react-router-dom"
import HeaderComp from './components/headerComp';
import NavBarComp from './components/navBarComp';
import { useUserIdStore } from "@/stores/userStore";

function Layout() {
  const userId = useUserIdStore((state) => state.userId);
  const removeUserId = useUserIdStore((state) => state.removeUserId);
  const setUserId = useUserIdStore((state) => state.setUserId);

  const [username,setUsername] = useState<string|null>("shadcn")
  const [userImage, setUserImage] = useState<string | null>(
    "https://github.com/shadcn.png"
  );

  return (
    <>
      <HeaderComp username={username} userProfileImg={userImage} />
      <main className="mt-12 min-h-[90vh]">
        <Outlet />
      </main>

      <NavBarComp />
    </>
  );
}

export default Layout
