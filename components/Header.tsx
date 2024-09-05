import Link from "next/link"
import Nav from "./Nav"
import MobileNav from "./MobileNav"


const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white bg-primary">
      <div className="container mx-auto flex justify-evenly items-center">
        
        <div className="flex items-center gap-8 ">
            <Nav />
        </div>

        {/* <div className="xl:hidden">
           <MobileNav/>
        </div> */}
        
      </div>
    </header>
  )
}

export default Header
