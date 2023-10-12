'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IGaleriePhoto } from '@/types/types';
import { fetchGalerie } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { ReactElement, useCallback, useEffect, useState } from 'react';

export const GaleriePhoto = () => {
  const { data } = useQueryUtils<[IGaleriePhoto]>({
    qKey: ['galeriePhoto'],
    qFn: () => fetchGalerie(),
  });

  const [type, setType] = useState<string>('Cuisine');
  const [pattern, setPattern] = useState<ReactElement<HTMLDivElement>[][]>([]);

  const createPattern = useCallback(
    (type: string) => {
      let imagesIdx: number = 0;
      let images: ReactElement<HTMLDivElement>[] = [];
      const rows: ReactElement<HTMLDivElement>[][] = [];
      let rIndex: number = 0;

      data?.[0].acf.images.forEach((image, idx) => {
        if (imagesIdx <= 3) {
          if (image.type?.[0] === type) {
            images.push(
              <div
                key={`${image.description}/${idx}/${image.titre}`}
                className="flex h-[400px] w-full items-center justify-center p-8"
              >
                <Image
                  src={image.image}
                  alt={image.titre}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
            );
          }
        }

        if (rIndex === data[0].acf.images.length - 1 || imagesIdx >= 3) {
          rIndex++;
          imagesIdx = 0;
          rows.push(images);
          images = [];
        } else {
          console.log(rIndex, data[0].acf.images.length - 1, imagesIdx);
          imagesIdx++;
          rIndex++;
        }
      });
      setPattern(rows);
    },
    [data]
  );

  useEffect(() => {
    createPattern(type);
  }, [createPattern, type]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-20 font-thunder text-3xl uppercase text-red-carmen">
          Galerie Photo
        </h1>
        <ul className="flex w-full items-center justify-center">
          <li
            onClick={() => setType('Cuisine')}
            className="mx-4 cursor-pointer font-thunder text-4xl font-bold text-red-carmen"
          >
            CUISINE
          </li>
          <li
            onClick={() => setType('Lieu')}
            className="mx-4 cursor-pointer font-thunder text-4xl font-bold text-red-carmen"
          >
            LIEUX
          </li>
        </ul>
      </div>
      {pattern.map((row, idx) => {
        return (
          <div key={idx} className="grid grid-cols-1 grid-rows-1">
            {row.map((items, idx) => {
              return items;
            })}
          </div>
        );
      })}
    </>
  );
};
