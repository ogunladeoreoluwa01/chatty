import React from "react";
import { Button } from "@/components/ui/button";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface CTAButtonProp {
  CTAText: string;
  CTAurl: string;
}

const CTAButtonComp: React.FC<CTAButtonProp> = ({
  CTAText = "Click Me",
  CTAurl = "/test",
}) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(CTAurl)}
      variant={"CTA"}
      className="transition-all duration-150 ease-linear w-[100px] group text-foreground h-[100px]  whitespace-normal flex flex-col  p-2 items-start justify-between shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(28,28,28)] hover:shadow-[.35rem_.35rem_0rem_-0.0625rem_rgb(28,28,28)] border-2 border-[rgb(28,28,28)] dark:shadow-[.25rem_.25rem_0rem_-0.0625rem_rgb(240,249,255)] dark:hover:shadow-[.35rem_.35rem_0rem_-0.0625rem_rgb(240,249,255)] dark:border-2 dark:border-[rgb(240,249,255)]"
    >
      <div className="w-full flex justify-end ">
        <MdArrowOutward className="text-[1.5rem] text-foreground font-extrabold" />
      </div>
      <h1 className="transition-all duration-150 ease-linear capitalize leading-[0.9rem] text-foreground h-fit text-left  group-hover:font-extrabold">
        {CTAText}
      </h1>
    </Button>
  );
};

export default CTAButtonComp;
