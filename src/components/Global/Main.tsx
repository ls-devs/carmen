'use client';
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import SmoothScroll from '@/utils/SmoothScroll';

export const Main = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const sC =  SmoothScroll(document, 120, 20);
  }, []);

  return (
    <main className="overflow-hidden" id={usePathname()}>
      {children}
    </main>
  );
};
