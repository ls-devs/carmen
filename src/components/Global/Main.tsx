"use client";
import {block} from "million/react";
import {usePathname} from "next/navigation";
import React from "react";

export const Main = block(({children}: {children: React.ReactNode}) => {
  return (
    <main className={`${usePathname() === "/" ? "!overflow-hidden" : ""}`} id={usePathname()}>
      {children}
    </main>
  );
});
