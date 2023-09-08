'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import React from 'react';

export const Actualites = () => {
  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  return (
    <div className="mt-20">
      <div className="relative h-auto w-full">
        <h1 className="mb-20 w-full text-center font-thunder text-6xl text-red-carmen">
          Actualités
        </h1>
        <div className="relative flex flex-col items-center justify-center bg-red-carmen">
          <div className="absolute -top-[25px] min-[400px]:-top-[30px] min-[515px]:-top-[40px] min-[615px]:-top-[50px] min-[700px]:-top-[60px] min-[850px]:-top-[70px] -z-[1] w-full">
            <Image
              src={'/img/actualites/actualites_top.png'}
              alt="ACTUALITES"
              width={300}
              height={500}
              className="w-full"

            />
          </div>

          <div className="absolute top-0 h-auto w-full">
            <Image
              src={'/img/actualites/actualites_cadran_2x.png'}
              alt="ACTUALITES"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          <h2 className="z-10 mt-[250px] font-thunder text-4xl text-cream-carmen">
            ÉVÈNEMENTS
          </h2>
          <p className="p-6 font-thunder text-lg text-cream-carmen">
            Elijah Craig, prêtre baptiste en Virginie, fonde sa distillerie au
            Kentucky, comté de Scott en 1789. Il est considéré comme le père du
            bourbon tel que nous le connaissons : un « mash bill » composé
            principalement de maïs, pour se différencier du « Rye » des états de
            états de l’est (Pennsylvanie et Maryland), et surtout l’élevage en
            fût de chêne fortement bousiné. Le terme de « Bourbon » apparait
            autour de 1850, avant on parle de « whiskey » tout simplement.
            Celui-ci fait référence au comté de Bourbon (dont le chef-lieu est
            Paris), ce terme à consonance française est commun dans ces états du
            et du Midwest américain qui ont appartenu à la France. A l’époque la
            Louisiane est une zone bien
          </p>
          <div className="h-auto w-full">
            <Image
              src={'/img/actualites/actualites_ph_2x.png'}
              alt="ACTUALITES"
              width={300}
              height={300}
              className="w-full"
            />
          </div>

          <div className="h-auto w-full">
            <Image
              src={'/img/actualites/actualites_paper_2x.png'}
              alt="ACTUALITES"
              width={300}
              height={300}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col space-y-2 p-8">
              <Image
                src={'/img/actualites/actualites_list_ph_2x.png'}
                alt="ACTUALITES"
                width={300}
                height={300}
              />
              <h3 className="font-thunder text-xl text-cream-carmen">
                UN ART DE VIVRE
              </h3>
              <p className="font-thunder text-lg text-cream-carmen">
                Chez Carmen, on ne mange pas seulement. On savoure, on partage,
                on rencontre, on rit, on aime, on se sent bien, on refait le
                monde, bref on vit. S'asseoir à une table de Chez Carmen, le
                "restaurant des abattoirs", c'est plonger dans une ambiance
                bistrot conviviale où les bons
              </p>
            </div>
            <div className="flex flex-col space-y-2 p-8">
              <Image
                src={'/img/actualites/actualites_list_ph_2x.png'}
                alt="ACTUALITES"
                width={300}
                height={300}
              />
              <h3 className="font-thunder text-xl text-cream-carmen">
                UN ART DE VIVRE
              </h3>
              <p className="font-thunder text-lg text-cream-carmen">
                Chez Carmen, on ne mange pas seulement. On savoure, on partage,
                on rencontre, on rit, on aime, on se sent bien, on refait le
                monde, bref on vit. S'asseoir à une table de Chez Carmen, le
                "restaurant des abattoirs", c'est plonger dans une ambiance
                bistrot conviviale où les bons
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-28 mt-14 flex flex-col">
        <div className="absolute -top-20 w-full">
          <Image
            src={'/img/actualites/souvenirs_top_sep_2x.png'}
            alt="ACTUALITES"
            width={300}
            height={300}
            className="w-full"
          />
        </div>

        <h2 className="w-full text-center font-thunder text-4xl text-red-carmen">
          Souvenirs
        </h2>
        <div className="flex items-center justify-center">
          <div className="m-4 flex w-[150px] flex-col items-center justify-center">
            <Image
              src={'/img/actualites/souvenir_ph_2x.png'}
              alt="SOUVENIR"
              width={300}
              height={300}
            />
            <div className="flex flex-col">
              <h3 className="font-thunder text-2xl font-semibold text-black-carmen">
                Masterclass avec Sean Williams
              </h3>
              <h4 className="font-thunder text-lg text-black-carmen">
                02/07/2022
              </h4>
            </div>
            <p className="text-xs text-black-carmen">
              Masterclass avec Sean Williams 02/07/2022 Née de la passion
              commune de deux épicuriens toulousains pour dénicher et déguster
              les meilleurs produits et de leur volonté de les par
            </p>
          </div>
          <div className="m-4 flex w-[150px] flex-col items-center justify-center">
            <Image
              src={'/img/actualites/souvenir_ph_2x.png'}
              alt="SOUVENIR"
              width={300}
              height={300}
            />
            <div className="flex flex-col">
              <h3 className="font-thunder text-2xl font-semibold text-black-carmen">
                Masterclass avec Sean Williams
              </h3>
              <h4 className="font-thunder text-lg text-black-carmen">
                02/07/2022
              </h4>
            </div>
            <p className="text-xs text-black-carmen">
              Masterclass avec Sean Williams 02/07/2022 Née de la passion
              commune de deux épicuriens toulousains pour dénicher et déguster
              les meilleurs produits et de leur volonté de les par
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
