'use client';
import { fetchPolicies } from '@/utils/fetchs/fetchs';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
export default function Page() {
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['getPolicies'],
    queryFn: fetchPolicies,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return <div></div>;
}
