'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites, MyActualite } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {
  const [myActu, setMyActu] = useState<IActualites>();
  const unslugify = (slug: string) =>
    slug
      .replace(/\-/g, ' ')
      .replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
      );
  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  data?.forEach((actu) => {
    if (actu.acf.title === unslugify(actu.acf.title)) {
      console.log(actu);
    }
  });

  return (
    <div>
      {myActu?.acf.image && (
        <Image
          src={myActu?.acf.image.toString()}
          alt={`${myActu?.acf.title}`}
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
