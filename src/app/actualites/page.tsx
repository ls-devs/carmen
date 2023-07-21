import { fetchAccueil } from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import { Actualites } from './actualites';
import { useDehydratedState } from '@/hooks/useDehydratedState';
import { block } from 'million/react';

const Page = () => {
  const dehydratedState = useDehydratedState([
    {
      qKey: 'getHome',
      qFn: () => fetchAccueil(),
    },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <Actualites />;
    </Hydrate>
  );
};

export default Page;
