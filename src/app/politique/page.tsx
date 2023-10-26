'use client';
import { fetchPolicies } from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import { Politique } from './Politique';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const Page = () => {
  const dehydratedState = useDehydratedState([
    {
      qKey: ['getPolicies'],
      qFn: () => fetchPolicies(),
    },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <Politique />
    </Hydrate>
  );
};

export default Page;
