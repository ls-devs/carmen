'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

const Page = ({ params }: { params: { slug: string } }) => {
  const [myActu, setMyActu] = useState<IActualites>();
  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  useEffect(() => {
    data?.map((actu) => {
      if (slugify(actu.acf.title) === params.slug) {
        setMyActu(actu);
      }
    });
  }, [data, params.slug]);

  return (
    <>
      {myActu?.acf && (
        <h1 className="mt-12 mb-32 px-8 py-4 text-center font-thunder text-2xl font-bold uppercase text-red-carmen md:text-3xl lg:text-5xl">
          {myActu.acf.title}
        </h1>
      )}
      <div className="px-[15%] relative flex flex-col items-center justify-center bg-red-carmen p-8 md:flex-row xl:items-start">
        <div className="w-full absolute -top-[40px] -z-[1] min-[620px]:-top-[80px] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[190px]">
          <Image
            src={'/img/actualites/actu_top.png'}
            alt="Actualites"
            width={1920}
            height={300}
            className="w-full"
          />
        </div>
        {myActu?.acf && (
          <>
            <div className="xl:h-auto xl:w-[700px]">
              <Image
                src={myActu!.acf.thumbnail}
                alt={myActu!.acf.title.toString()}
                width={200}
                height={200}
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-center xl:pl-28">
              <p
                className="p-8 font-thunder text-cream-carmen md:text-xl lg:text-3xl"
                dangerouslySetInnerHTML={{ __html: myActu!.acf.description }}
              ></p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
