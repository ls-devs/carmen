'use client';
import { Button } from '@/components/Button/Button';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import slugify from 'slugify';

export const Actualites = () => {
  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  const router = useRouter();

  return (
    <div className="mt-12">
      <h1 className="mb-20 w-full text-center font-thunder text-6xl font-bold uppercase text-red-carmen xl:mb-0">
        Actualités
      </h1>
      <div className="relative h-auto w-full bg-red-carmen py-7 lg:mt-36">
        <div className="absolute -top-[40px] -z-[1] min-[620px]:-top-[80px] lg:-top-[120px] xl:-top-[160px]">
          <Image
            src={'/img/actualites/actu_top.png'}
            alt="Actualites"
            width={1920}
            height={1080}
          />
        </div>
        <div className="absolute top-full -z-[1] mb-48">
          <Image
            src={'/img/actualites/actu_bot.png'}
            alt="Actualites"
            width={1920}
            height={1080}
            className="max-h-[210px]"
          />
        </div>

        {data?.[0].acf && (
          <div className="flex flex-col items-center justify-center space-y-3 md:flex-row md:items-start md:space-x-4 md:p-4">
            <div className="flex flex-col items-center justify-center">
              <div className="md-h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
                <Link href={`/actualites/${slugify(data?.[0].acf.title)}`}>
                  <div className="relative h-full w-full">
                    <Image
                      src={data?.[0] ? data?.[0].acf.thumbnail : ''}
                      alt={data?.[0] ? data?.[0].acf.description : ''}
                      fill
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 md:items-start xl:pl-28">
              <Link href={`/actualites/${slugify(data?.[0].acf.title)}`}>
                <h3 className="font-thunder text-2xl font-bold uppercase text-cream-carmen lg:text-3xl xl:text-4xl">
                  {data?.[0].acf.title}
                </h3>
              </Link>

              <p
                className="text-center font-thunder text-cream-carmen md:py-4 md:text-start md:text-xl lg:py-4 lg:text-2xl"
                dangerouslySetInnerHTML={{
                  __html: data?.[0].acf.intro_actu
                    ? data?.[0].acf.intro_actu
                    : '',
                }}
              />
              <Button
                color="cream-carmen"
                text="EN SAVOIR +"
                textSize="text-xl"
                width="w-[165px]"
                height="h-[70px]"
                onClick={() =>
                  router.push(`actualites/${slugify(data?.[0].acf.title)}`)
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="align-center mt-20 grid columns-md auto-cols-fr auto-rows-fr gap-3 p-4 md:mt-36 md:grid-cols-3 md:p-8 lg:mt-48 lg:gap-12 lg:p-12 xl:mt-72 xl:gap-x-20">
        {data?.map((actu, idx) => {
          return (
            idx > 0 && (
              <div
                className="flex flex-col items-center justify-center space-y-3 md:justify-start"
                key={actu.id}
              >
                <Link
                  className="flex flex-col items-center justify-center"
                  href={`/actualites/${slugify(actu.acf.title)}`}
                  prefetch
                >
                  <div className="h-[400px] w-[400px] md:h-[350px] md:w-[220px] lg:h-[500px] lg:w-[300px] xl:h-[600px] xl:w-[400px]">
                    <div className="relative h-full w-full">
                      <Image
                        src={actu.acf.thumbnail}
                        alt={actu.acf.title}
                        fill
                        className="h-full w-full origin-center bg-center object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center justify-end">
                    <p
                      className="w-[300px] pt-8 text-start font-thunder text-[10px] text-red-carmen md:w-[200px] md:text-start md:text-xl lg:w-[300px] lg:text-[13px] xl:w-[400px]"
                      dangerouslySetInnerHTML={{
                        __html: `Postée le : ${new Date(
                          actu.date_gmt
                        ).toLocaleDateString()},
                      `,
                      }}
                    />
                    <h3 className="w-[300px] py-3 text-start font-thunder text-xl font-bold uppercase text-red-carmen md:w-full">
                      {actu.acf.title}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: actu.acf.intro_actu }}
                      className="text-md w-[300px] text-start font-thunder text-red-carmen md:w-[220px] md:text-start md:text-lg lg:w-[300px] xl:w-[400px]"
                    />
                  </div>
                </Link>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
