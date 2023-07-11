import { fetchAccueil } from '@/utils/fetchs/fetchs';
import getQueryClient from '@/utils/getQueryClient';
import Hydrate from '@/utils/hydrateClient';
import { dehydrate } from '@tanstack/react-query';
import { Actualites } from './Actualites';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getHome'], fetchAccueil);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Actualites />;
    </Hydrate>
  );
};

export default Page;
