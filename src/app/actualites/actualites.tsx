'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';

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
        <div className="flex flex-col items-center justify-center space-y-6">
          <h3 className="font-thunder text-2xl font-bold uppercase text-red-carmen">
            {data?.[0].acf.title}
          </h3>
          <Image
            src={data?.[0] ? data?.[0].acf.thumbnail : ''}
            alt={data?.[0] ? data?.[0].acf.description : ''}
            width={300}
            height={300}
          />

          <p
            className="text-center font-thunder text-red-carmen"
            dangerouslySetInnerHTML={{
              __html: data?.[0].acf.description
                ? data?.[0].acf.description
                : '',
            }}
          ></p>
        </div>
      </div>
      <div className="align-center grid auto-cols-fr auto-rows-fr grid-cols-1 gap-x-3 gap-y-3 p-4 md:grid-cols-3">
        {data?.map((actu, idx) => {
          return (
            idx > 0 && (
              <Link
                href={`/actualites/${slugify(actu.acf.title)}`}
                className="flex flex-col items-center justify-center"
                key={actu.id}
              >
                <Image
                  src={actu.acf.thumbnail}
                  alt={actu.acf.title}
                  width={200}
                  height={200}
                />
                <p
                  dangerouslySetInnerHTML={{ __html: actu.acf.intro_actu }}
                  className="text-center font-thunder text-lg text-red-carmen"
                ></p>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};
