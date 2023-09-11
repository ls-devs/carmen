'use client';
import { usePathname } from 'next/navigation';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import React, { useEffect } from 'react';

export const Main = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.onscroll = () => {
      window.scrollTo(0, window.scrollY);
    };
  }, []);
  return (
    <main className="overflow-hidden" id={usePathname()}>
      {children}
    </main>
  );
};
