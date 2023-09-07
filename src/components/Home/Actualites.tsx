import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

type ActualiteProps = {
  addToItems: (item: HTMLAnchorElement) => void;
  screenWidth: number;
  position: number;
  title: string;
  description: string;
  thumbnail: string;
  image?: string | boolean;
  intro_actu: string;
};
export const Actualite: React.FC<ActualiteProps> = ({
  addToItems,
  screenWidth,
  position,
  title,
  description,
  thumbnail,
  intro_actu,
  image,
}) => {
  const myRef = useRef<HTMLAnchorElement>(null);
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

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

  return (
    <Link
      href={`actualites/${slugify(title)}`}
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
          dangerouslySetInnerHTML={{ __html: intro_actu }}
        />
      </div>
    </Link>
  );
};
