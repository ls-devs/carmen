/* eslint-disable @typescript-eslint/no-explicit-any */
// type QueryType<T> = T extends any[] ? [T] : T;
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
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: 3600000,
  });

  return { data, isLoading, isFetching, isError };
};
