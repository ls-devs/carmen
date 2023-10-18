/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import lottie, { AnimationItem } from 'lottie-web';
import animationData from '../../../public/loader/loader_carmen.json';

export const Global = ({
  children,
  isAnim,
  setIsAnim,
  params,
}: {
  children: React.JSX.Element;
  isAnim: boolean;
  setIsAnim: (bool: boolean) => void;
  params: { isAnim: boolean };
}) => {
  const anim = useRef<AnimationItem>();
  const animationContainer = useRef<HTMLDivElement>(null);
  const childrens = useRef<HTMLElement>(null);
  useEffect(() => {
    const animRef = anim.current;
    if (anim.current === undefined) {
      anim.current = lottie.loadAnimation({
        container: animationContainer.current as Element,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData,
      });
      if (isAnim) {
        anim.current.addEventListener('complete', () => {
          setIsAnim(false);
          childrens.current?.classList.toggle('opacity-0');
          childrens.current?.classList.toggle('h-[0px]');
          childrens.current?.classList.toggle('w-[0px]');
        });
      }
    }

    return () => animRef?.destroy();
  }, [isAnim, setIsAnim]);

  return (
    <main className="overflow-hidden" id={usePathname()}>
      {isAnim && (
        <div className="absolute top-0 z-10 flex h-[100vh] w-full items-center justify-center bg-cream-carmen">
          <div className="h-1/2 w-1/2" ref={animationContainer}></div>
        </div>
      )}
      <section
        ref={childrens}
        className="h-[0px] w-[0px] opacity-0 transition-all"
      >
        {children}
      </section>
    </main>
  );
};
