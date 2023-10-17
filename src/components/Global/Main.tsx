/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import lottie, { AnimationItem } from 'lottie-web';
import animationData from '../../../public/loader/loader_carmen.json';

export const Global = ({
  children,
  isAnim,
  setIsAnim,
}: {
  children: JSX.Element;
  isAnim: boolean;
  setIsAnim: (bool: boolean) => void;
}) => {
  const anim = useRef<AnimationItem>();
  const animationContainer = useRef<HTMLDivElement>(null);
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
        });
      }
    }

    return () => animRef?.destroy();
  }, [isAnim, setIsAnim]);

  interface childrenWithProps {
    isAnim: boolean;
  }

  const ChildrenWithProps = (children: ReactNode) => {
    if (React.isValidElement<childrenWithProps>(children)) {
      return React.cloneElement(children, { isAnim: isAnim });
    }
  };

  return (
    <main className="overflow-hidden" id={usePathname()}>
      {isAnim && (
        <div
          ref={animationContainer}
          className="absolute top-0 z-10 h-[100vh] w-full bg-cream-carmen"
        ></div>
      )}

      {React.cloneElement(children, {
        props: {
          isAnim: isAnim,
        },
      })}
    </main>
  );
};
