import { fetchCarte } from '@/utils/fetchs/fetchs';
import getQueryClient from '@/utils/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import React from 'react';
import { LaCarte } from './LaCarte';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getCarte'], fetchCarte);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <LaCarte />
    </Hydrate>
  );
};

export default Page;
