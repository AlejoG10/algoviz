"use client";

import { NextUIProvider } from "@nextui-org/react";

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <main className="relative flex flex-col justify-center items-center bg-white px-4 lg:px-16 w-screen min-h-screen">
        {children}
      </main>
    </NextUIProvider>
  );
};

export default AppContainer;
