import { useQueryUtils } from "@/hooks/useQueryUtils";
import { IActualites } from "@/types/types";
import { fetchActualites } from "@/utils/fetchs/fetchs";

export default function Page({ params }: { params: { slug: string } }) {
  const { data } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  return <div>My Post: {params.slug}</div>;
}
