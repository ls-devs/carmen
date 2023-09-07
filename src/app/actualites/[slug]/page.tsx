import { fetchAccueil, fetchActualites } from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import { Actualites } from './actualites';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const Page = () => {
  const dehydratedState = useDehydratedState([
    {
      qKey: 'getActualites',
      qFn: () => fetchActualites(),
    },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <Actualites />
    </Hydrate>
  );
};

export default Page;
