"use client";

import { NextUIProvider } from "@nextui-org/react";

import Filters from "@/components/shared/filters";
import Controller from "@/components/algorithms/controller";

export default function Home() {
  return (
    <NextUIProvider>
      <main className="flex justify-center items-center px-4 sm:px-8 pb-4 sm:pb-8">
        <div className="flex flex-col w-full">
          <Filters />
          <Controller />
        </div>
      </main>
    </NextUIProvider>
  );
}
