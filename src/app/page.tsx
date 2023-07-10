import getQueryClient from "@/utils/getQueryClient";
import {dehydrate, useQuery} from "@tanstack/react-query";
import Hydrate from "@/utils/hydrateClient";
import { fetchAccueil, fetchHistoire } from "@/utils/fetchs/fetchs";
import {HomePage} from "./homepage";

const Page = async () => {

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['getHome'], fetchAccueil);
  await queryClient.prefetchQuery(['getFournisseurs'], fetchAccueil);
  await queryClient.prefetchQuery(['getHistoire'], fetchHistoire);

  const dehydratedState = dehydrate(queryClient);

  return (
      <Hydrate state={dehydratedState}>
        <HomePage/>
      </Hydrate>
  );
}

export default Page;
