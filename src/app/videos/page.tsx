import { fetchVidéos as fetchVideos } from '@/utils/fetchs/fetchs';
import Hydrate from '@/utils/hydrateClient';
import { Videos } from './Videos';
import { useDehydratedState } from '@/hooks/useDehydratedState';

const VideosPage = () => {
  const dehydrateState = useDehydratedState([
    {
      qKey: ['getVideos'],
      qFn: () => fetchVideos(),
    },
  ]);
  return (
    <Hydrate state={dehydrateState}>
      <Videos />
    </Hydrate>
  );
};

export default VideosPage;
