"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

import Button from "@/components/shared/form/button";

const HomePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div className="flex flex-col justify-center items-center w-screen">
        <h1 className="flex flex-col justify-center items-center text-3xl md:text-4xl text-center font-bold mb-10">
          <TypeAnimation
            sequence={["Visualize", 2000, "Learn", 2000, "Simulate", 2000]}
            wrapper="h1"
            speed={3}
            deletionSpeed={3}
            repeat={Infinity}
          />
          Popular Algorithms!
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

export default HomePage;
