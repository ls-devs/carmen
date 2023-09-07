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
    <div className="mt-44 flex flex-col md:flex-row">
      {myActu?.acf && (
        <>
          <Image
            src={myActu!.acf.thumbnail}
            alt={myActu!.acf.title.toString()}
            width={200}
            height={200}
          />
          <p dangerouslySetInnerHTML={{ __html: myActu!.acf.description }}></p>
        </>
      )}
    </div>
  );
};

export default Page;
