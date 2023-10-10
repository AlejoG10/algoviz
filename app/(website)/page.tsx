"use client";

import { NextUIProvider } from "@nextui-org/react";

const LandingPage = () => {
  return (
    <NextUIProvider>
      <div className="flex justify-center items-center w-screen h-screen">
        <h1 className="text-5xl font-black">LANDING PAGE</h1>
      </div>
    </NextUIProvider>
  );
};

export default LandingPage;
