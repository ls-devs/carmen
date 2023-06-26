"use client";
import {usePathname} from "next/navigation";
import React from "react";

export const Main = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="overflow-hidden" id={usePathname()}>
      {children}
    </main>
  );
};
