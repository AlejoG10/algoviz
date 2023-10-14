"use client";

import { usePathname } from "next/navigation";
import { Filter, FilterX } from "lucide-react";

import { useFilters } from "@/hooks/useFilters";
import Brand from "../shared/brand";
import Button from "../shared/form/button";

const Navbar = () => {
  const pathname = usePathname();

  const filters = useFilters();

  const styles = { zIndex: 999999 };

  return (
    <div
      style={styles}
      className="fixed top-0 bg-white px-4 lg:px-16 w-full h-navbar"
    >
      <nav className="flex justify-between items-center w-full h-full">
        {/* NAV BRAND */}
        <Brand />

        {pathname !== "/" && (
          <Button
            circle
            className="lg:hidden hover:bg-neutral-100"
            onClick={filters.onToggle}
          >
            <div className="flex items-center gap-x-2 px-2">
              {!filters.isOpen && (
                <p className="text-neutral-500 font-semibold">
                  {filters.active}
                </p>
              )}
              {filters.isOpen ? (
                <FilterX className="text-neutral-500" />
              ) : (
                <Filter className="text-neutral-500" />
              )}
            </div>
          </Button>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
