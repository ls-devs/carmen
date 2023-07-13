import React, { useEffect, useState } from 'react';
import DataFooter from './DataFooter';
import { fetchOptions } from '@/utils/fetchs/fetchs';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import Hydrate from '@/utils/hydrateClient';

export const Footer = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getOptions'], fetchOptions);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <DataFooter />
    </Hydrate>
  );
};
