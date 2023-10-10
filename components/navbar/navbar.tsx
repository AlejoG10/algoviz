import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed left-0 bg-white px-8 sm:px-14 w-full h-navbar z-50">
      <nav className="flex justify-between items-center w-full h-full">
        {/* NAV BRAND */}
        <Link href="/algorithms" className="group flex items-center gap-x-4">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="group-hover:animate-spin"
          />
          <p className="text-2xl text-neutral-800 font-semibold">VisuAlgo</p>
        </Link>

        {/* SOCIALS */}
        <Link href="https://github.com/AlejoG10">
          <Github size={38} className="text-neutral-800 hover:bg-neutral-800 hover:text-white rounded-full p-1" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
