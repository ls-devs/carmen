'use client';
import { Button } from '@/components/Button/Button';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IGaleriePhoto, IHomePage, IVideos } from '@/types/types';
import { fetchAccueil, fetchGalerie, fetchVidéos } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CarmenEnImage = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [gridItems, setGridItems] = useState<ReactElement<HTMLDivElement>[][]>(
    []
  );
  const [videosPres, setVideosPres] = useState<IVideos>();
  const router = useRouter();

  useEffect(() => {
    const myObserver = new ResizeObserver((_entries) => {
      setScreenWidth(window.innerWidth);
    });
    myObserver.observe(document.body);
    return () => {
      myObserver.unobserve(document.body);
    };
  }, []);

  const { data } = useQueryUtils<[IGaleriePhoto]>({
    qKey: ['getGalerie'],
    qFn: () => fetchGalerie(),
  });
  const { data: dataV } = useQueryUtils<IVideos[]>({
    qKey: ['getVideos'],
    qFn: () => fetchVidéos(),
  });

  const { data:dataH } = useQueryUtils<IHomePage[]>({
    qKey: ['getHome'],
    qFn: () => fetchAccueil(),
  });

  useEffect(() => {
    dataV?.map((vid, idx) => {
      if (idx === 0) setVideosPres(vid);
    });
  }, [dataV]);

  const FillGrid = useCallback(() => {
    let imgIdx: number = 0;
    let reserverdIdx: number = 0;
    let dataGrid: ReactElement<HTMLDivElement>[] = [];
    const dataGridWrapper: ReactElement<HTMLDivElement>[][] = [];

    data?.[0].acf.images.forEach((photo, _idx) => {
      if (imgIdx === 0) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative`}>
            <Image
              src={`${photo.image}`}
              width={150}
              height={150}
              alt={`${photo.titre}`}
              className={`h-full w-full object-cover md:w-full`}
            />
          </div>
        );
      }
      if (imgIdx === 1) {
        dataGrid.push(
          <div
            key={uuidv4()}
            className={`relative h-full w-full md:row-span-2`}
          >
            <Image
              src={`${photo.image}`}
              width={150}
              height={150}
              alt={`${photo.titre}`}
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-[50%] -translate-y-[50%] object-cover md:left-0 md:top-0 md:col-span-2 md:h-3/4 md:w-full md:translate-x-0 md:translate-y-0"
            />
          </div>
        );
      }
      if (imgIdx === 2) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative h-full w-full`}>
            <Image
              src={`${photo.image}`}
              width={150}
              height={150}
              alt={`${photo.titre}`}
              className="absolute h-full w-full object-cover md:h-full md:w-full"
            />
          </div>
        );
      }
      if (imgIdx === 3) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative h-full w-full`}>
            <Image
              src={`${photo.image}`}
              width={150}
              height={150}
              alt={`${photo.titre}`}
              className="absolute top-1/2 h-full w-full -translate-y-[50%] object-cover md:top-3/4 md:h-1/2 md:w-full md:translate-x-0 lg:top-auto lg:h-1/2 lg:w-full lg:translate-x-0 lg:translate-y-0"
            />
          </div>
        );
      }
      if (imgIdx === 4) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative col-span-2 md:col-span-1`}>
            <Image
              src={`${photo.image}`}
              width={150}
              height={150}
              alt={`${photo.titre}`}
              className="absolute w-full object-cover md:top-1/3 md:h-1/2 lg:h-full lg:w-full"
            />
          </div>
        );
      }
      if (imgIdx === 5) {
        dataGrid.push(
          <div
            key={uuidv4()}
            className={`relative md:col-span-1 lg:col-start-4`}
          >
            <Image
              src={`${photo.image}`}
              width={150}
              height={150}
              alt={`${photo.titre}`}
              className="absolute h-full w-full object-cover md:bottom-0 md:top-8 md:h-full md:w-full lg:-top-10 lg:h-1/2"
            />
          </div>
        );
      }
      if (imgIdx === 6) {
        dataGrid.push(
          <div
            key={uuidv4()}
            className={`relative col-span-2  md:row-auto lg:col-start-3 lg:row-start-3`}
          >
            <Image
              src={`${photo.image}`}
              width={200}
              height={200}
              alt={`${photo.titre}`}
              className="absolute right-0 h-full w-full object-cover md:top-1/2 md:w-3/4 md:-translate-y-[50%] lg:top-0 lg:h-3/4 lg:w-full"
            />
          </div>
        );
      }
      if (reserverdIdx === data[0].acf.images.length - 1 || imgIdx >= 6) {
        reserverdIdx++;
        imgIdx = 0;
        dataGridWrapper.push(dataGrid);
        dataGrid = [];
      } else {
        imgIdx++;
        reserverdIdx++;
      }
      setGridItems(dataGridWrapper);
    });
  }, [data]);

  useEffect(() => {
    FillGrid();
  }, [FillGrid]);

  return (
    <div className="relative flex flex-col">
      <div className="mb-12 mt-12 flex items-center justify-start">
        <h1 className="ml-20 font-thunder text-5xl font-bold text-red-carmen md:ml-20 md:text-7xl lg:ml-72 lg:text-8xl">
          Galerie Photos
        </h1>
      </div>
      <section className="relative mb-40 flex flex-col items-center justify-center">
        {gridItems?.map((row, idx) => {
          return (
            <div
              key={`row_${idx}`}
              className={`galerie_grid ${
                idx >= 1 && 'dynamic_grid'
              } grid h-auto auto-rows-fr gap-4 px-4 md:px-20`}
            >
              {row.map((items, _idx) => {
                return items;
              })}
            </div>
          );
        })}

        <div className="absolute bottom-0 flex w-full items-center justify-center">
          <Button
            color="red-carmen"
            text="VOIR LA GALERIE"
            textSize="text-xl"
            width="w-[135px]"
            height="h-[70px]"
            classes={['hidden']}
          />
        </div>
      </section>

      <div className="relative flex h-auto w-full items-center justify-center bg-red-carmen sm:min-h-[700px] sm:justify-start">
        <Image
          src={'/img/home/videos/video_top_4x.png'}
          alt="VIDEOS"
          width={1100}
          height={300}
          className="absolute !-top-[55px] -z-[1] w-full sm:!-top-[70px] md:!-top-[120px] lg:!-top-[150px] xl:!-top-[200px]"
        />
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
          <div className="flex max-w-[1400px] flex-col justify-center lg:flex-row">
            <div className="relative order-2 mt-8 h-auto w-full sm:mt-0 sm:px-5">
              <div className="relative mb-14">
                {videosPres?.acf && (
                  <iframe
                    className="relative h-[280px] w-full bg-cover bg-center bg-no-repeat object-cover px-5 md:h-[480px] lg:h-[380px] lg:w-[640px]"
                    src={`${
                      videosPres.acf.url.includes('shorts')
                        ? videosPres.acf.url.replace('shorts', 'embed')
                        : videosPres!.acf.url.replace('watch?v=', 'embed/')
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
                <h3 className="absolute -top-4 left-0 -rotate-6 font-softgank text-2xl text-cream-carmen sm:-top-16 sm:left-36 sm:z-10 sm:rotate-6 sm:text-4xl">
                  VIDÉOS
                </h3>
                <div className="absolute -top-12 right-0 sm:-top-32 sm:left-0">
                  <Image
                    src={'/img/home/videos/videos_appareil.png'}
                    alt="APPAREIL PHOTO"
                    width={100}
                    height={100}
                    className="sm:w-[190px]"
                  />
                </div>
                <div className="absolute -bottom-14 left-0">
                  <Image
                    src={'/img/home/videos/videos_phone.png'}
                    alt="APPAREIL PHOTO"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className="order-2 flex h-full w-full flex-col items-center justify-center lg:items-start">
              <h2 className="my-4 font-thunderLC text-7xl text-cream-carmen sm:my-0">
                VIDÉOS
              </h2>
              {screenWidth >= 640 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataH?.[0].acf.video_block_text
                      ? dataH?.[0].acf.video_block_text
                      : '',
                  }}
                  className="flex-col px-5 text-center font-thunderLC text-cream-carmen sm:px-0 sm:pr-5 lg:text-start lg:text-lg xl:text-xl"
                ></div>
              )}
              {screenWidth < 640 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataH?.[0].acf.video_block_text
                      ? dataH?.[0].acf.video_block_text.split('\n')[0]
                      : '',
                  }}
                  className="px-5 text-center font-thunderLC text-cream-carmen sm:hidden sm:px-0 sm:pr-5"
                ></div>
              )}
            </div>
          </div>
          {screenWidth < 640 && (
            <div className="order-3 sm:absolute sm:right-0 sm:top-[405px] sm:hidden sm:w-1/3">
              <div
                dangerouslySetInnerHTML={{
                  __html: dataH?.[0].acf.video_block_text
                    ? dataH?.[0].acf.video_block_text.split('\n')[1]
                    : '',
                }}
                className="px-5 font-thunderLC text-cream-carmen sm:px-0 sm:pr-5"
              ></div>
            </div>
          )}
          <div className="relative order-3 h-[140px] w-full items-center justify-start sm:flex sm:items-center sm:justify-center">
            <Button
              color="cream-carmen"
              text="VOIR LES VIDEOS"
              textSize="text-xl"
              width="w-[165px]"
              onClick={() => router.push('/videos')}
              height="h-[70px]"
              classes={[
                'absolute',
                'top-[50%]',
                'left-1/2',
                '-translate-x-[50%]',
                '-translate-y-[50%]',
                'sm:!top-[30%]',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
