"use client";

import Link from "next/link";
import { Github, LucideIcon, User2, Youtube } from "lucide-react";

import Brand from "../shared/brand";
import { filtersArr } from "../shared/filters";

interface FooterItemProps {
  route?: string;
  name: string;
  icon: LucideIcon;
}

const FooterItem: React.FC<FooterItemProps> = ({ route, name, icon: Icon }) => {
  return route ? (
    <Link
      href={route}
      rel="noopener noreferrer"
      target="_blank"
      className="flex items-center gap-x-2 text-neutral-800 hover:text-black w-fit"
    >
      <Icon size={20} />
      <p className="text-base">{name}</p>
    </Link>
  ) : (
    <div className="flex items-center gap-x-2 text-neutral-800 hover:text-black w-fit">
      <Icon size={20} />
      <p className="text-base">{name}</p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-neutral-100 p-4 lg:px-16 lg:py-8 w-screen cursor-default">
      <div className="flex flex-col gap-y-10">
        {/* NAV BRAND */}
        <Brand />

        <div className="flex flex-col sm:flex-row sm:gap-x-20 md:gap-x-28 lg:gap-x-40 gap-y-10">
          <div className="flex flex-col gap-y-5">
            <p className="text-lg text-neutral-800 font-medium">
              Sorting Algorithms
            </p>

            <div className="flex flex-col gap-y-4">
              {filtersArr.slice(0, -1).map((filter) => (
                <FooterItem key={filter.id} {...filter} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <p className="text-lg text-neutral-800 font-medium">
              More About Me
            </p>

            <div className="flex flex-col gap-y-4">
              <FooterItem
                name="Portfolio"
                icon={User2}
                route="portfolio-alejog10.vercel.app"
              />
              <FooterItem
                name="Github"
                icon={Github}
                route="https://github.com/AlejoG10"
              />
              <FooterItem
                name="YouTube"
                icon={Youtube}
                route="https://www.youtube.com/@codingspot"
              />
            </div>
          </div>
        </div>

        <p className="text-center sm:text-start text-neutral-800">
          &copy; {new Date().getFullYear()} AlgoViz. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
