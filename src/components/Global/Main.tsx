'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export const Main = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  useSmoothScroll(path);

  return (
    <main className="overflow-hidden" id={usePathname()}>
      {children}
    </main>
  );
};
