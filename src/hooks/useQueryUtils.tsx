/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
export const useQueryUtils = <T extends any[]>({
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
  });

  return { data, isLoading, isFetching, isError };
};
