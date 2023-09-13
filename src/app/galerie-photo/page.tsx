import { useDehydratedState } from '@/hooks/useDehydratedState';
import { fetchGalerie } from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import React from 'react';
import { GaleriePhoto } from './GaleriePhoto';

const GaleriePage = () => {
  const dehydratedClient = useDehydratedState([
    {
      qKey: 'getGalerie',
      qFn: () => fetchGalerie(),
    },
  ]);

  return (
    <Hydrate state={dehydratedClient}>
      <GaleriePhoto />
    </Hydrate>
  );
};

export default GaleriePage;
