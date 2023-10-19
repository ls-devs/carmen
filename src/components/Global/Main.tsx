/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

export const Global = ({
  children,
  isAnim,
}: {
  children: React.JSX.Element;
  isAnim: boolean;
}) => {
  const main = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isAnim) {
      main.current?.classList.toggle('opacity-0');
      main.current?.classList.toggle('h-[0px]');
      main.current?.classList.toggle('w-[0px]');
    }
  }, [isAnim]);
  console.log(usePathname());
  return (
    <main
      ref={main}
      className={cn(
        `h-[0px] w-[0px] opacity-0 transition-all ${
          usePathname() === '/' && 'overflow-hidden'
        }`
      )}
      id={usePathname()}
    >
      {children}
    </main>
  );
};
