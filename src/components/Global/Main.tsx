'use client';
import { block } from 'million/react';
import { usePathname } from 'next/navigation';
import React from 'react';

export const Main = /* optimize */ block(
  ({ children }: { children: React.ReactNode }) => {
    return (
      <main className="overflow-hidden" id={usePathname()}>
        {children}
      </main>
    );
  }
);
