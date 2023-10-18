import {
  fetchAccueil,
  fetchFournisseurs,
  fetchHistoire,
  fetchVidéos,
} from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import { HomePage } from './homepage';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const Page = () => {
  const dehydratedState = useDehydratedState([
    { qKey: ['getHome'], qFn: () => fetchAccueil() },
    { qKey: ['getFournisseurs'], qFn: () => fetchFournisseurs() },
    { qKey: ['getHistoire'], qFn: () => fetchHistoire() },
    { qKey: ['getActualites'], qFn: () => fetchAccueil() },
    { qKey: ['getVideos'], qFn: () => fetchVidéos() },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <HomePage />
    </Hydrate>
  );
};

export default Page;
