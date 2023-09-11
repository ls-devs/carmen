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
    <div className="relative mt-44 flex flex-col items-center justify-center bg-red-carmen p-8 md:flex-row xl:items-start xl:mt-72">
      <div className="absolute -top-[40px] -z-[1] min-[620px]:-top-[80px] lg:-top-[120px] xl:-top-[160px]">
        <Image
          src={'/img/actualites/actu_top.png'}
          alt="Actualites"
          width={1920}
          height={300}
        />
      </div>
      {myActu?.acf && (
        <>
          <div className="xl:h-[800px] xl:w-[600px]">
            <Image
              src={myActu!.acf.thumbnail}
              alt={myActu!.acf.title.toString()}
              width={200}
              height={200}
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start justify-center xl:pl-28">
            <h1 className="px-8 py-4 font-thunder text-2xl font-bold uppercase text-cream-carmen md:text-3xl lg:text-4xl">
              {myActu.acf.title}
            </h1>
            <p
              className="p-8 font-thunder text-cream-carmen md:text-xl lg:text-3xl"
              dangerouslySetInnerHTML={{ __html: myActu!.acf.description }}
            ></p>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
