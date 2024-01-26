"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
const navUrls=[
    {
        name:'Home',
        location:'/'
    },
    {
        name:'Create Event',
        location:'/create-event'
    },{
        name:'My Profile',
        location:'/profile'
    }
]
const NavBar: React.FC = () => {
const pathname=usePathname()
  return (
    <div className=" items-center gap-4 mr-28 md:flex hidden">
     {
        navUrls.map((url)=>(
            <Link
            href={url.location}
            key={url.name}
            className={`${
              pathname === url.location
                ? "gradient-text border-0 border-b-2 py-2 px-4 border-b-custom-yellow"
                : " hover:border-b-custom-yellow hover:px-8 transition-all hover:text-custom-pink hover:font-semibold hover:border-b-[3px] text-neutral-700 px-4 border-b-2 border-b-custom-pink py-2"
            } text-[0.8275rem] `}
          >
            {url.name}
          </Link>
        ))
     }
     
    </div>
  );
};
import { CiMenuBurger } from "react-icons/ci";
import { usePathname } from "next/navigation";
export const NavSheet:React.FC=()=>{
    return(
        <Sheet>
            <SheetTrigger className="md:hidden block">
                <CiMenuBurger/>
            </SheetTrigger>
            <SheetContent>
                
            </SheetContent>
        </Sheet>
    )
}
export default NavBar;
