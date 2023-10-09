import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IGaleriePhoto } from '@/types/types';
import { fetchGalerie } from '@/utils/fetchs/fetchs';

export const GaleriePhoto = () => {
  const { data } = useQueryUtils<IGaleriePhoto>({
    qKey: ['galeriePhoto'],
    qFn: () => fetchGalerie(),
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-20 font-thunder text-3xl uppercase text-red-carmen">
          Galerie Photo
        </h1>
        <ul className="flex w-full items-center justify-center">
          <li className="font-bold mx-4 cursor-pointer font-thunder text-2xl text-red-carmen">
            CUISINE
          </li>
          <li className="font-bold mx-4 cursor-pointer font-thunder text-2xl text-red-carmen">
            LIEUX
          </li>
        </ul>
      </div>
      <div className="row-auto mt-8 grid min-h-[500px] grid-cols-2"></div>
    </>
  );
};
