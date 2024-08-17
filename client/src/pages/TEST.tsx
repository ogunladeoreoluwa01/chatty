import { ModeToggle } from "@/components/mode-toggle";
import NavBarComp from "@/components/navBarComp";
import  React  from "react";
import { useState,useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Separator } from "@/components/ui/separator";
import { GiBookmark, GiCrystalEye } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import {Link, Navigate, useNavigate} from "react-router-dom"


interface TestProp{

}



const TEST: React.FC<TestProp> = ({  }) => {


  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-primary text-2xl headerText font-black textShadow dark:textShadowDark ">
        Welcome to the Home Page
      </h1>
      <ModeToggle />

      
    </div>
  );
};

export default TEST;
