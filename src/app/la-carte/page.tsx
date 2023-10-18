import { fetchCarte } from '@/utils/fetchs/fetchs';
import { Hydrate } from '@tanstack/react-query';
import React from 'react';
import { LaCarte } from './LaCarte';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const Page = () => {
  const dehydratedState = useDehydratedState([
    {
      qKey: ['getCarte'],
      qFn: () => fetchCarte(),
    },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <LaCarte />
    </Hydrate>
  );
};

export default Page;
