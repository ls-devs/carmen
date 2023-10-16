'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="overflow-hidden" id={usePathname()}>
      {children}
    </main>
  );
};
