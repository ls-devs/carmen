import { fetchHistoire } from '@/utils/fetchs/fetchs';
import getQueryClient from '@/utils/getQueryClient';
import Hydrate from '@/utils/hydrateClient';
import { dehydrate } from '@tanstack/react-query';
import { NotreHistoire } from './NotreHistoire';

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getHistoire'], fetchHistoire);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <NotreHistoire />
    </Hydrate>
  );
};

export default Page;
