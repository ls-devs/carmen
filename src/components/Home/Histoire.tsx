import React from 'react'
import Image from 'next/image'
import { Button } from '../Button/Button'
import { useQuery } from '@tanstack/react-query';
import { fetchHistoire } from '@/utils/fetchs/fetchs';

export const Histoire = (props : {}) => {
  const {datan, isLoading, isFetching, isError} = useQuery(['getHistoire'], () => fetchHistoire());
  return (

      <div className="relative mt-20 flex w-full flex-col items-center justify-center sm:mt-32 lg:mt-64">
        <Image
          src={"/img/home/histoire/histoire_top_4x.png"}
          width={1100}
          height={300}
          alt="CARMEN NOTRE HISTOIRE"
          className="absolute !-top-[120px] w-full object-contain sm:!-top-[200px] md:hidden lg:!-top-[200px]"
        />
        <div className="flex flex-col items-center overflow-hidden sm:overflow-visible">
          <div className="flex items-center sm:ml-10 sm:w-full sm:items-start">
            <h2 className="z-20 flex flex-col items-center justify-center font-thunder text-6xl text-red-carmen sm:flex-row">
              Notre <span className="my-5 text-8xl sm:mx-5 sm:text-6xl">Histoire</span>
            </h2>
          </div>
          <div className="relative mt-14 flex h-auto flex-col sm:-mt-5 sm:ml-5">
            <h3 className="hidden overflow-hidden p-3 font-thunder text-3xl font-[500] sm:flex sm:p-0">
              UN ART DE VIVRE
            </h3>
            <p className="p-3 font-thunderLC text-lg leading-[21.5px] sm:w-1/2 sm:p-0">
              Chez Carmen, on ne mange pas seulement. On savoure, on partage, on rencontre, on rit, on aime, on se sent
              bien, on refait le monde, bref on vit. S'asseoir à une table de Chez Carmen, le "restaurant des
              abattoirs", c'est plonger dans une ambiance bistrot conviviale où les bons produits faits maison et
              savourés en bonne compagnie sont un art de vivre. Pièces du boucher, recettes grand-mère et plats
              "canaille" sont les signatures de cette institution toulousaine, créé en 1956.
            </p>
            <span className="absolute -right-4 -top-24 -rotate-12 font-softgank text-8xl text-red-carmen sm:-top-60 sm:left-3/4">
              1956
            </span>
          </div>
          <div className="justfy-center relative flex h-auto w-full items-center px-2 sm:absolute">
            <div className="flex-center relative flex h-[300px] w-full justify-center">
              <div className="absolute -bottom-2 -left-14 h-[230px] w-[230px] sm:-right-16 sm:-top-28 sm:left-auto sm:-z-10 sm:h-[320px] sm:w-[320px]">
                <Image
                  src={"/img/home/histoire/histoire_screen.png"}
                  alt="NOTRE HISTOIRE"
                  fill={true}
                  className="object-contain"
                />
              </div>

              <div className="absolute -right-24 -top-3 h-[280px] w-[280px] rotate-[20deg] sm:left-1/2 sm:-rotate-0">
                <Image
                  src={"/img/home/histoire/tony_carmen_histoire.png"}
                  alt="TONY CARMEN"
                  fill={true}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="break absolute left-[13%] top-6 flex rotate-12 flex-col flex-wrap items-start justify-start text-start font-softgank text-5xl text-red-carmen sm:-top-10 sm:left-2/4 sm:text-2xl sm:text-black-carmen">
              <h3>Tony</h3>
              <h3>CARMEN</h3>
            </div>
          </div>

          <div className="flex w-full items-center justify-center sm:justify-start">
            <p className="p-3 font-thunderLC text-lg leading-[21.5px] sm:ml-5 sm:w-1/2 sm:p-0">
              Au centre-ville de Toulouse, dans le quartier des Carmes, à deux pas du Palais de Justice, Chez Carmen est
              un endroit incontournable pour les amateurs de bonne chère, de plats cuisinés avec amour lentement
              mijotés, et de moments de convivialité.
            </p>
          </div>
          <div className="relative mt-12 flex h-[200px] w-full items-start justify-end">
            <Button
              color="red-carmen"
              text="EN SAVOIR +"
              textSize="text-xl"
              width="w-[135px]"
              height="h-[70px]"
              classes={["!absolute -left-2 top-0", "sm:left-[15%]"]}
            />
            <div className="h-auto w-auto">
              <Image
                src={"/img/home/histoire/palais_de_justice.png"}
                width={160}
                height={160}
                alt="PALAIS DE JUSTICE"
                className="absolute -right-14 top-[15px] rotate-12 sm:-top-[180px] sm:right-32 sm:w-[190px] sm:-rotate-12"
              />
            </div>
            <h3 className="-transform-x-1/2 absolute -top-12 left-1/2 -rotate-12 flex-col font-softgank text-3xl text-red-carmen sm:-right-12 sm:-top-56 sm:left-auto sm:flex sm:text-2xl sm:text-black-carmen">
              PALAIS
              <span> DE JUSTICE</span>
            </h3>
          </div>
        </div>
      </div>
  )
}
