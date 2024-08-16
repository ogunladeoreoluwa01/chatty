import { ModeToggle } from "@/components/mode-toggle";
import NavBarComp from "@/components/navBarComp";
import  React  from "react";
import { NavLink } from "react-router-dom";


interface TestProp{

}
const TEST: React.FC<TestProp> = () => {
 
  return (
    <div>
      <h1 className="text-foreground">Welcome to the Home Page</h1>
      <ModeToggle />

    <NavBarComp/>
    </div>
  );
};

export default TEST;
