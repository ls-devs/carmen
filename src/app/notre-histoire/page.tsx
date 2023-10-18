import { fetchHistoire } from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import { NotreHistoire } from './NotreHistoire';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const Page = () => {
  const dehydratedState = useDehydratedState([
    {
      qKey: ['getHistoire'],
      qFn: () => fetchHistoire(),
    },
  ]);

  return (
    <Hydrate state={dehydratedState}>
      <NotreHistoire />
    </Hydrate>
  );
};

export default Page;
