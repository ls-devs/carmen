import { fetchOptions } from '@/utils/fetchs/fetchs';
import getQueryClient from '@/utils/getQueryClient';
import Hydrate from '@/utils/hydrateClient';
import { dehydrate } from '@tanstack/react-query';
import React from 'react';
import DataNavbar from './DataNavbar';

export const Navbar = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getOptions'], fetchOptions);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DataNavbar />
    </Hydrate>
  );
};
