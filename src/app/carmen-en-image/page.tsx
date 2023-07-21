import { fetchGalerie } from '@/utils/fetchs/fetchs';
import React from 'react';
import { CarmenEnImage } from './CarmenEnImage';
import { useDehydratedState } from '@/hooks/useDehydratedState';
import Hydrate from '@/utils/hydrateClient';

const GaleriePage = () => {
  const dehydratedClient = useDehydratedState([
    {
      qKey: 'getGalerie',
      qFn: () => fetchGalerie(),
    },
  ]);

  return (
    <Hydrate state={dehydratedClient}>
      <CarmenEnImage />;
    </Hydrate>
  );
};

export default GaleriePage;
