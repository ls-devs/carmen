/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
export const useQueryUtils = <T,>({
  qKey,
  qFn,
}: {
  qKey: string[];
  qFn: () => Promise<any>;
}) => {
  const { data, isLoading, isFetching, isError } = useQuery<T>({
    queryKey: qKey,
    queryFn: () => qFn(),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: 1800000,
    staleTime: 1800000,
  });

  return { data, isLoading, isFetching, isError };
};
