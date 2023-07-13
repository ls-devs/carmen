import {
  fetchAccueil,
  fetchFournisseurs,
  fetchHistoire,
  fetchOptions,
} from '@/utils/fetchs/fetchs';
import getQueryClient from '@/utils/getQueryClient';
import Hydrate from '@/utils/hydrateClient';
import { dehydrate } from '@tanstack/react-query';
import { HomePage } from './Homepage';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getHome'], fetchAccueil);
  await queryClient.prefetchQuery(['getFournisseurs'], fetchFournisseurs);
  await queryClient.prefetchQuery(['getHistoire'], fetchHistoire);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomePage />
    </Hydrate>
  );
};

export default Page;
