'use client';
import { Button } from '@/components/Button/Button';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

const Page = ({ params }: { params: { slug: string } }) => {
  const [myActu, setMyActu] = useState<IActualites>();
  const [actus, setActus] = useState<IActualites[]>();
  const [actualActu, setActualActu] = useState<number>(0);
  const router = useRouter();
  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  useEffect(() => {
    setActus(data);
  }, [data]);

  useEffect(() => {
    data?.map((actu, idx) => {
      if (slugify(actu.acf.title) === params.slug) {
        setMyActu(actu);
        setActualActu(idx);
      }
    });
  }, [data, params.slug]);

  return (
    <>
      {myActu?.acf && (
        <h1 className="mb-8 mt-20 px-8 py-4 text-center font-thunder text-2xl font-bold uppercase text-red-carmen md:text-3xl lg:mb-24 lg:text-5xl xl:mb-40">
          {myActu.acf.title}
        </h1>
      )}
      <div className="relative flex flex-col items-center justify-center bg-red-carmen p-8 px-[15%] md:flex-row xl:items-start">
        <div className="absolute -top-[40px] -z-[1] w-full min-[620px]:-top-[80px] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[190px]">
          <Image
            src={'/img/actualites/actu_top.png'}
            alt="Actualites"
            width={1920}
            height={300}
            className="w-full"
          />
        </div>
        {myActu?.acf && (
          <div className="flex items-center justify-center">
            <div className="absolute left-0 top-[10px] ml-4 flex w-full">
              <Button
                color="cream-carmen"
                text="PRÉCÉDENT"
                textSize="text-xl"
                width="w-[125px]"
                height="h-[70px]"
                onClick={() =>
                  actus &&
                  router.push(
                    `${slugify(
                      actus[actualActu - 1]
                        ? actus[actualActu - 1].acf.title
                        : actus[actus.length - 1].acf.title
                    )}`
                  )
                }
              />
            </div>

            <div className="mt-24 flex flex-col md:flex-row">
              <div className="xl:h-[500px] xl:w-[500px] xl:min-w-[500px]">
                <Image
                  src={myActu!.acf.thumbnail}
                  alt={myActu!.acf.title.toString()}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col items-start justify-center md:justify-start md:pl-8 xl:pl-28">
                <p
                  className="py-8 font-thunder text-cream-carmen md:py-0 md:text-xl lg:text-3xl"
                  dangerouslySetInnerHTML={{ __html: myActu!.acf.description }}
                ></p>
              </div>
            </div>
            <div className="absolute right-0 top-[10px] mr-4">
              <Button
                color="cream-carmen"
                text="SUIVANT"
                textSize="text-xl"
                width="w-[125px]"
                height="h-[70px]"
                onClick={() =>
                  actus &&
                  router.push(
                    `${slugify(
                      actus[actualActu + 1]
                        ? actus[actualActu + 1].acf.title
                        : actus[0].acf.title
                    )}`
                  )
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
