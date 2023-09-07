'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { useState } from 'react';
import slugify from 'slugify';

export default function Page({ params }: { params: { slug: string } }) {
  const [myActu, setMyActu] = useState<IActualites>();

  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  data?.forEach((actu) => {
    if (slugify(actu.acf.title) === params.slug) {
      setMyActu(actu);
    }
  });

  console.log(myActu);

  return <div></div>;
}
