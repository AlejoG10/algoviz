"use client";

import { NextUIProvider } from "@nextui-org/react";

import Filters from "@/components/filters";
import Controller from "@/components/algorithms/controller";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="flex justify-center items-center w-screen min-h-screen px-4 sm:px-8">
        <div className="flex flex-col gap-y-10 w-full">
          <Filters />
          <Controller />
        </div>
      </main>
    </NextUIProvider>
  );
}
