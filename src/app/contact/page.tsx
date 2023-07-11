import { fetchCarte } from '@/utils/fetchs/fetchs';
import getQueryClient from '@/utils/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import React from 'react';
import { Contact } from './Contact';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getOptions'], fetchCarte);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Contact />
    </Hydrate>
  );
};

export default Page;
