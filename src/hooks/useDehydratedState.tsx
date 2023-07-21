/* eslint-disable @typescript-eslint/no-explicit-any */
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';

type pType = {
  qKey: string;
  qFn: () => Promise<any>;
};

export const useDehydratedState = async (prefetchFn: pType[]) => {
  const queryClient = getQueryClient();
  prefetchFn.forEach(async (prefetch) => {
    const { qKey, qFn } = prefetch;
    await queryClient.prefetchQuery([`${qKey}`], () => qFn);
  });
  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};
