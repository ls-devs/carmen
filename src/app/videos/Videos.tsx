'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IVideos } from '@/types/types';
import { fetchVidéos } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const Videos = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const { data } = useQueryUtils<IVideos[]>({
    qKey: ['getVideos'],
    qFn: () => fetchVidéos(),
  });

  useEffect(() => {
    const myObserver = new ResizeObserver((_entries) => {
      setScreenWidth(window.innerWidth);
    });

    myObserver.observe(document.body);

    return () => {
      myObserver.unobserve(document.body);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="my-12 items-center justify-center py-8 text-center font-thunder text-5xl font-semibold uppercase text-red-carmen xl:mb-24 2xl:mb-44">
        Vidéos
      </h1>
      <div className="relative">
        <div className="absolute -top-[40px] -z-[1] min-[620px]:-top-[80px] lg:-top-[120px] xl:-top-[160px]">
          <Image
            src={'/img/actualites/actu_top.png'}
            alt="Actualites"
            width={1920}
            height={300}
          />
        </div>

        <div className="grid auto-cols-fr auto-rows-fr gap-y-4 bg-red-carmen py-8 md:grid-cols-2 md:gap-x-12 lg:grid-cols-1 lg:gap-y-24 xl:px-20">
          {data &&
            data.map((video, idx) => {
              return (
                <div
                  key={video.id}
                  className={`flex flex-col items-center justify-center lg:flex-row lg:items-start lg:px-12`}
                >
                  <div
                    className={`flex w-full flex-col ${screenWidth > 1024 && idx % 2
                        ? 'lg:order-2 lg:ml-8 lg:items-end'
                        : 'lg:mr-8 lg:items-start'
                      }`}
                  >
                    <h3
                      className={`text-center font-thunder text-2xl uppercase text-cream-carmen md:text-3xl xl:my-4 xl:text-4xl ${idx % 2 ? 'lg:text-end' : 'lg:text-start'
                        }`}
                    >
                      {video.acf.title}
                    </h3>
                    {screenWidth >= 1024 && (
                      <p
                        className={`text-center font-thunder text-cream-carmen xl:w-[600px] xl:text-lg 2xl:text-xl ${idx % 2 ? 'lg:text-end' : 'lg:text-start'
                          }`}
                        dangerouslySetInnerHTML={{
                          __html: video.acf.description,
                        }}
                      />
                    )}
                  </div>
                  <iframe
                    className={`h-[280px] w-[480px] max-w-[500px] md:h-[280px] md:w-[480px] md:max-w-full lg:h-[380px] lg:min-w-[640px] xl:min-h-[380px] ${screenWidth > 1024 && idx % 2 ? 'lg:order-1' : ''
                      }`}
                    src={`${video.acf.url.includes('shorts')
                        ? video.acf.url.replace('shorts', 'embed')
                        : video.acf.url.replace('watch?v=', 'embed/')
                      }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  {screenWidth < 1024 && (
                    <p
                      className="max-w-[500px] text-center font-thunder text-cream-carmen"
                      dangerouslySetInnerHTML={{
                        __html: video.acf.description,
                      }}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
