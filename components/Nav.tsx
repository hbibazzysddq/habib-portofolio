'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'project',
        path: '/projek'
    },
    {
        name: 'about me',
        path: '/profile'
    }
]





const Nav = () => {
  const pathname = usePathname();
  console.log(pathname);
    return (
      <nav className="flex gap-8 ">
        {links.map((link, index) => { // Perbaikan sintaks arrow function
          return (
            <Link href={link.path} key={index} className={`${
              link.path === pathname ? "text-accent border-b-2 border-accent" : ""
            } capitalize font-medium hover:text-accent   transition-all`}
          >
              {link.name}
            </Link>
          );
        })}
      </nav>
    );
  };

export default Nav
