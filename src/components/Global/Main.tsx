/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

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
  return (
    <main
      ref={main}
      className="h-[0px] w-[0px] overflow-hidden opacity-0 transition-all"
      id={usePathname()}
    >
      {children}
    </main>
  );
};
