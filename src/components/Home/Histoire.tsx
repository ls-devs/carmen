import React from 'react';
import Image from 'next/image';
import { fetchHistoire } from '@/utils/fetchs/fetchs';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { INotreHistoire } from '@/types/types';

export const Histoire = () => {
  const { data } = useQueryUtils<[INotreHistoire]>({
    qKey: ['getHistoire'],
    qFn: () => fetchHistoire(),
  });

  return (
    <div className="mb-44 mt-28 xl:mt-[250px]">
      <h1 className="jutify-center flex flex-col items-center font-thunder text-4xl text-red-carmen md:ml-[6%] md:w-[400px] md:flex-row md:justify-start md:text-6xl lg:ml-[7.5%] xl:ml-[8.5%]">
        {data?.[0].acf.title_heading.split(' ')[0]}
        <span className="text-6xl md:mx-5">
          {data?.[0].acf.title_heading.split(' ')[1]}
        </span>
      </h1>
      <div className="flex flex-col p-5 md:mb-20 md:flex-row md:justify-around">
        {data && (
          <div className="w-full md:w-1/2">
            <div
              className="font-thunder text-2xl font-semibold text-black-carmen md:text-4xl"
              dangerouslySetInnerHTML={{
                __html: data[0].acf.subtitle_heading,
              }}
            />
            <div
              className="font-thunder text-lg text-black-carmen md:text-xl lg:max-w-[600px] xl:max-w-[500px]"
              dangerouslySetInnerHTML={{ __html: data[0].acf.texte_heading }}
            />
          </div>
        )}
        <div className="flex h-[400px] w-auto items-center justify-center">
          <div className="relative h-full w-[300px]">
            <Image
              src={'/img/notre_histoire/histoire_tony_2x.png'}
              alt="NOTRE HISTOIRE"
              width={220}
              height={220}
              className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] lg:w-[600px] xl:-left-16 xl:top-16 xl:min-h-[540px] xl:min-w-[500px]"
            />
            <Image
              src={'/img/notre_histoire/histoire_ph1_2x.png'}
              alt="NOTRE HISTOIRE"
              width={180}
              height={180}
              className="absolute -left-7 top-1/2 -z-[1] -translate-y-[20%] md:-bottom-16 md:top-auto md:z-[1] xl:-left-[300px] xl:right-auto xl:min-w-[250px]"
            />
            <Image
              src={'/img/notre_histoire/histoire_ph2_2x.png'}
              alt="NOTRE HISTOIRE"
              width={140}
              height={140}
              className="absolute -right-8 top-20 -z-[1] md:-right-16 md:top-3 md:w-[250px] xl:-top-12 xl:min-w-[350px] xl:rotate-[15deg]"
            />
            <h2 className="absolute -left-4 top-24 flex flex-col items-start justify-center font-softgank text-3xl text-red-carmen md:left-1 md:top-4 md:rotate-12 md:text-black-carmen xl:-top-32 xl:left-auto xl:right-8 xl:rotate-0 xl:text-5xl">
              TONY <span>CARMEN</span>
            </h2>
            <span className="hidden md:absolute md:-top-5 md:right-16 md:block md:-rotate-12 md:font-softgank md:text-6xl md:text-red-carmen xl:bottom-20 xl:right-0 xl:top-auto xl:rotate-12 xl:text-8xl">
              1956
            </span>
            <span className="hidden md:absolute md:-right-4 md:bottom-36 md:block md:w-[80px] md:-rotate-12 md:font-softgank md:text-xl md:text-black-carmen xl:bottom-0 xl:left-14 xl:w-auto xl:text-4xl">
              PALAIS DE JUSTICE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
