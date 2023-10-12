"use client";

import Link from "next/link";
import Image from "next/image";
import { Filter, FilterX } from "lucide-react";

import { useFilters } from "@/hooks/useFilters";
import Button from "../shared/form/button";

const Navbar = () => {
  const filters = useFilters();

  const styles = { zIndex: 999999 };

  return (
    <div
      style={styles}
      className="fixed left-0 bg-white px-8 sm:px-14 w-full h-navbar"
    >
      <nav className="flex justify-between items-center w-full h-full">
        {/* NAV BRAND */}
        <Link href="/algorithms" className="group flex items-center gap-x-4">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="group-hover:animate-spin-slow"
          />
          <p className="text-2xl text-neutral-800 font-semibold">VisuAlgo</p>
        </Link>

        <Button
          circle
          className="lg:hidden hover:bg-neutral-100"
          onClick={filters.onToggle}
        >
          <div className="flex items-center gap-x-2 px-2">
            {!filters.isOpen && (
              <p className="text-neutral-500 font-semibold">
                {filters.activeFilter}
              </p>
            )}
            {filters.isOpen ? (
              <FilterX className="text-neutral-500" />
            ) : (
              <Filter className="text-neutral-500" />
            )}
          </div>
        </Button>
      </nav>
    </div>
  );
};

export default Navbar;
