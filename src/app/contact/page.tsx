import { fetchOptions } from '@/utils/fetchs/fetchs';
import { Hydrate } from '@tanstack/react-query';
import React from 'react';
import { Contact } from './Contact';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const Page = () => {
  const dehydratedState = useDehydratedState([
    {
      qKey: 'getOptions',
      qFn: () => fetchOptions(),
    },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <Contact />
    </Hydrate>
  );
};

export default Page;
