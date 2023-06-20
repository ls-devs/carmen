import {block} from "million/react";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";

type ActualiteProps = {
  addToItems: (item: HTMLDivElement) => void;
  screenWidth: number;
  position: number;
};

export const Actualite: React.FC<ActualiteProps> = /* optimize */ block(({addToItems, screenWidth, position}) => {
  const myRef = useRef<HTMLDivElement | null>(null);
  const [myPosition, setMyPosition] = useState<number>(0);

  useEffect(() => {
    if (screenWidth < 640) {
      setMyPosition(position * 270);
    } else if (screenWidth >= 640 && screenWidth <= 768) {
      setMyPosition(position * 570);
    }
  }, [position, screenWidth]);

  useEffect(() => {
    addToItems(myRef);
  }, [addToItems]);

  return (
    <div
      ref={myRef}
      className={`absolute h-auto w-[250px] sm:h-[350px] sm:w-[520px]`}
      style={{left: `${myPosition}px`}}
    >
      <Image
        src={"/img/home/actualites/actualites_placeholder_img.png"}
        alt="ACUTALITES PLACEHOLDER"
        width={250}
        height={250}
        className="w-full object-cover sm:pl-6"
      />
      <div className="flex w-full flex-col p-4 sm:p-6">
        <h3 className="font-thunder text-xl text-cream-carmen sm:text-2xl">UN ART DE VIVRE</h3>
        <p className="font-thunderLC text-sm text-cream-carmen sm:text-lg">
          Chez Carmen, on ne mange pas seulement. On savoure, on partage, on rencontre, on rit, on aime, on se sent
          bien, on refait le monde, bref on vit. S'asseoir à une table de Chez Carmen, le "restaurant des abattoirs",
          c'est plonger dans une ambiance bistrot conviviale où les bons produits faits maison
        </p>
      </div>
    </div>
  );
});
