"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

import Button from "@/components/shared/form/button";

const LandingPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div className="flex flex-col justify-center items-center gap-y-16 w-screen min-h-screen">
        <h1 className="flex flex-col justify-center items-center text-3xl md:text-4xl text-center font-bold">
          <TypeAnimation
            sequence={["Visualize", 2000, "Learn", 2000, "Simulate", 2000]}
            wrapper="h1"
            speed={3}
            deletionSpeed={3}
            repeat={Infinity}
          />
          <span className="mt-2">Popular Algorithms!</span>
        </h1>

        <Link href="/algorithms/sorting/bubble-sort">
          <Button className="bg-neutral-800 hover:bg-neutral-950 w-60">
            Start now!
          </Button>
        </Link>
      </div>
    )
  );
};

export default LandingPage;
