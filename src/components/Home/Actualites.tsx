import { block } from 'million/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type ActualiteProps = {
  addToItems: (item: HTMLDivElement) => void;
  screenWidth: number;
  position: number;
  title: string;
  description: string;
  thumbnail: string;
  image?: string | boolean;
};
export const Actualite: React.FC<ActualiteProps> = ({
  addToItems,
  screenWidth,
  position,
  title,
  description,
  thumbnail,
  image,
}) => {
  const myRef = useRef<HTMLDivElement>(null);
  const [myPosition, setMyPosition] = useState<number>(0);

  useEffect(() => {
    if (screenWidth < 640) {
      setMyPosition(position * 270);
    } else if (screenWidth >= 640) {
      setMyPosition(position * 570);
    }
  }, [position, screenWidth]);

  useEffect(() => {
    if (myRef.current) addToItems(myRef.current);
  }, [addToItems]);

  return (
    <div
      ref={myRef}
      className={`absolute h-auto w-[250px] sm:h-[350px] sm:w-[520px]`}
      style={{ left: `${myPosition}px` }}
    >
      <Image
        src={`${thumbnail}`}
        alt="ACUTALITES PLACEHOLDER"
        width={250}
        height={250}
        className="w-full object-cover sm:pl-6"
      />
      <div className="flex w-full flex-col p-4 sm:p-6">
        <h3 className="font-thunder text-xl text-cream-carmen sm:text-2xl">
          {title}
        </h3>
        <div
          className="font-thunderLC text-sm text-cream-carmen sm:text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};
