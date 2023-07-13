import { fetchVidéos } from "@/utils/fetchs/fetchs";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrateClient";
import { dehydrate } from "@tanstack/react-query";
import { Videos } from "./Videos";

const VideosPage = () => {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(["getVideos"], () => fetchVidéos());
  const dehydrateState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydrateState}>
      <Videos />
    </Hydrate>
  );
};

export default VideosPage;
