'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IActualites } from '@/types/types';
import { fetchActualites } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

export const Actualites = ({ params }: { params?: { slug: string } }) => {
  const [myActu, setMyActu] = useState<IActualites>();

  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  data?.forEach((actu) => {
    if (slugify(actu.acf.title) === params?.slug) {
      setMyActu(actu);
    }
  });

  useEffect(() => {
    console.log(myActu);
  }, [myActu]);

  return <div></div>;
};
