import {
  fetchAccueil,
  fetchFournisseurs,
  fetchHistoire,
} from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import { HomePage } from './homepage';
import { block } from 'million/react';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const Page = () => {
  const dehydratedState = useDehydratedState([
    { qKey: 'getHome', qFn: () => fetchAccueil() },
    { qKey: 'getFournisseurs', qFn: () => fetchFournisseurs() },
    { qKey: 'getHistoire', qFn: () => fetchHistoire() },
    { qKey: 'getActualites', qFn: () => fetchAccueil() },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <HomePage />
    </Hydrate>
  );
};

export default Page;
