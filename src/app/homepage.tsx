'use client';
import { Button } from '@/components/Button/Button';
import { Histoire } from '@/components/Home/Histoire';
import { Actualite } from '@/components/Home/Actualites';
import { v4 as uuidv4 } from 'uuid';

import {
  fetchAccueil,
  fetchActualites,
  fetchGalerie,
  fetchVidéos,
} from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import Link from 'next/link';
import {
  ReactElement,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IActualites, IGaleriePhoto, IHomePage, IVideos } from '@/types/types';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { Fournisseurs } from '@/components/Home/Fournisseurs';

export const HomePage = () => {
  const videoHomeRef = useRef<HTMLVideoElement>(null);
  const [videosPres, setVideosPres] = useState<IVideos>();
  const [gridItems, setGridItems] = useState<ReactElement<HTMLDivElement>[][]>(
    []
  );
  const router = useRouter();
  const items = useRef<HTMLAnchorElement[]>([]);
  const addToItems = (item: HTMLAnchorElement) => {
    if (!items.current.includes(item)) items.current.push(item);
  };
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const { data } = useQueryUtils<IHomePage[]>({
    qKey: ['getHome'],
    qFn: () => fetchAccueil(),
  });

  const { data: dataV } = useQueryUtils<IVideos[]>({
    qKey: ['getVideos'],
    qFn: () => fetchVidéos(),
  });

  const { data: dataA } = useQueryUtils<IActualites[]>({
    qKey: ['getActualites'],
    qFn: () => fetchActualites(),
  });

  const { data: dataG } = useQueryUtils<[IGaleriePhoto]>({
    qKey: ['getGalerie'],
    qFn: () => fetchGalerie(),
  });

  useEffect(() => {
    dataV?.map((vid, idx) => {
      if (idx === 0) setVideosPres(vid);
    });
  }, [dataV]);

  const FillGrid = useCallback(() => {
    let imgIdx: number = 0;
    let reserverdIdx: number = 0;
    let dataGrid: ReactElement<HTMLDivElement>[] = [];
    const dataGridWrapper: ReactElement<HTMLDivElement>[][] = [];

    dataG?.[0].acf.images.forEach((photo, _idx) => {
      if (imgIdx === 0) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative`}>
            <div className="relative h-full w-full">
              <Image
                src={`${photo.image}`}
                fill
                alt={`${photo.titre}`}
                className={`h-full w-full object-cover md:w-full`}
              />
            </div>
          </div>
        );
      }
      if (imgIdx === 1) {
        dataGrid.push(
          <div
            key={uuidv4()}
            className={`relative h-full w-full md:row-span-2`}
          >
            <div className="relative h-full w-full">
              <Image
                src={`${photo.image}`}
                fill
                alt={`${photo.titre}`}
                className="object-cover"
              />
            </div>
          </div>
        );
      }
      if (imgIdx === 2) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative h-full w-full`}>
            <div className="relative h-full w-full">
              <Image
                src={`${photo.image}`}
                fill
                alt={`${photo.titre}`}
                className="absolute h-full w-full object-cover md:h-full md:w-full"
              />
            </div>
          </div>
        );
      }
      if (imgIdx === 3) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative h-full w-full`}>
            <div className="relative h-full w-full">
              <Image
                src={`${photo.image}`}
                fill
                alt={`${photo.titre}`}
                className="object-cover"
              />
            </div>
          </div>
        );
      }
      if (imgIdx === 4) {
        dataGrid.push(
          <div key={uuidv4()} className={`relative col-span-2 md:col-span-1`}>
            <div className="relative h-full w-full">
              <Image
                src={`${photo.image}`}
                fill
                alt={`${photo.titre}`}
                className="absolute w-full object-cover md:top-1/3 md:h-1/2 lg:h-full lg:w-full"
              />
            </div>
          </div>
        );
      }
      if (imgIdx === 5) {
        dataGrid.push(
          <div
            key={uuidv4()}
            className={`relative md:col-span-1 lg:col-start-4`}
          >
            <div className="relative h-full w-full lg:h-1/2">
              <Image
                src={`${photo.image}`}
                fill
                alt={`${photo.titre}`}
                className="absolute h-full w-full object-cover md:bottom-0 md:top-8 md:h-full md:w-full lg:-top-10 lg:h-1/2"
              />
            </div>
          </div>
        );
      }
      if (imgIdx === 6) {
        dataGrid.push(
          <div
            key={uuidv4()}
            className={`relative col-span-2  md:row-auto lg:col-start-3 lg:row-start-3`}
          >
            <div className="relative h-full w-full lg:h-3/4">
              <Image
                src={`${photo.image}`}
                fill
                alt={`${photo.titre}`}
                className="absolute right-0 h-full w-full object-cover md:top-1/2 md:w-3/4 md:-translate-y-[50%] lg:top-0 lg:h-3/4 lg:w-full"
              />
            </div>
          </div>
        );
      }
      if (imgIdx === 6) {
        reserverdIdx++;
        dataGridWrapper.push(dataGrid);
        dataGrid = [];
      } else {
        imgIdx++;
        reserverdIdx++;
      }
      setGridItems(dataGridWrapper);
    });
  }, [dataG]);

  useEffect(() => {
    FillGrid();
  }, [FillGrid]);

  useEffect(() => {
    const myObserver = new ResizeObserver((_entries) => {
      setScreenWidth(window.innerWidth);
    });

    myObserver.observe(document.body);

    return () => {
      myObserver.unobserve(document.body);
    };
  }, []);

  const sliderContainer = useRef<HTMLDivElement>(null);
  const isDown = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeft = useRef<number>(0);

  const onSliderClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    isDown.current = true;
    sliderContainer.current?.classList.toggle(cn('cursor-grab'));
    startX.current =
      (e as React.MouseEvent<HTMLDivElement, MouseEvent>).pageX ||
      (e as TouchEvent<HTMLDivElement>).touches[0].pageX -
      sliderContainer.current!.offsetLeft;
    scrollLeft.current = sliderContainer.current!.scrollLeft;
  };

  const onSliderMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent<HTMLDivElement>
  ) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x: number =
      (e as React.MouseEvent<HTMLDivElement, MouseEvent>).pageX ||
      (e as TouchEvent<HTMLDivElement>).touches[0].pageX -
      sliderContainer.current!.offsetLeft;
    const dist = x - startX.current;
    sliderContainer.current!.scrollLeft = scrollLeft.current - dist;
    items.current.forEach((item) => {
      item.classList.add(cn('pointer-events-none'));
    });
  };

  const onSliderLeave = (): void => {
    isDown.current = false;
    items.current.forEach((item) => {
      item.classList.remove(cn('pointer-events-none'));
    });
  };

  return (
    <>
      {/* HEADING VIDEO */}
      <div className="relative flex h-[500px] items-center justify-center md:mt-5 lg:mb-36 lg:mt-32">
        <div className="relative flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat object-cover">
          <video
            ref={videoHomeRef}
            width="560"
            height="315"
            src={`${data?.[0].acf.video_url}`}
            title="YouTube video player"
            className="relative h-full w-full bg-cover bg-center bg-no-repeat object-cover md:h-[450px] md:w-[90%] md:rounded-3xl lg:h-[550px] lg:w-[900px] xl:h-[700px] xl:w-[80%]"
            loop
            autoPlay
            playsInline
            muted
          >
            <source src={`${data?.[0].acf.video_url}`} type="video/mp4" />
          </video>
          <div className="absolute top-0 hidden h-full w-4/5 rotate-[4deg] md:top-5 md:flex md:h-[450px] md:w-[91%] md:rounded-3xl md:border-[1px] md:border-black-carmen lg:-top-5 lg:h-[550px] lg:w-[900px] xl:-top-20 xl:h-[700px] xl:w-[80%]" />
          <Image
            src={'/img/home/heading/couverts.png'}
            width={400}
            height={800}
            alt="CHEZ CARMEN"
            className="hidden md:absolute md:-left-40 md:top-20 md:flex md:rotate-[20deg] lg:-left-28 lg:-top-8 lg:max-h-[600px] lg:w-[400px] lg:rotate-[10deg] xl:h-[800px] xl:max-h-[800px] xl:w-[600px]"
          />
          <div className="hidden md:absolute md:right-0 md:top-0 md:flex md:h-full md:w-[250px]">
            <Image
              src={'/img/home/heading/heading_top_right_ph.png'}
              width={140}
              height={140}
              alt="CHEZ CARMEN"
              className="hidden md:absolute md:-right-2 md:top-0 md:flex lg:-top-24 lg:w-[350px] xl:-top-36 xl:max-w-[300px]"
            />
            <Image
              src={'/img/home/heading/heading_bot_right_ph_2x.png'}
              width={90}
              height={90}
              alt="CHEZ CARMEN"
              className="hidden md:absolute md:-right-6 md:top-40 md:flex lg:w-[200px] xl:-right-20 xl:w-[350px] xl:max-w-[450px]"
            />
          </div>
        </div>
        <div className="absolute -bottom-10 z-[9] flex w-full items-center justify-center sm:-bottom-0 md:-bottom-6 lg:-bottom-44">
          <svg
            className="h-[70px] w-[70px]"
            fill="none"
            height="123"
            viewBox="0 0 44 123"
            width="44"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_800_3247)">
              <path
                d="M1.46647 48.6179C0.749527 48.4224 0.553999 48.0313 0.87988 47.4447C1.20576 46.793 2.05305 46.4671 3.42176 46.4671C4.3994 46.2064 5.2141 46.5974 5.86587 47.6403C6.58281 48.6831 7.39751 50.7687 8.30998 53.8972C9.22245 57.156 9.77644 59.4698 9.97197 60.8385C10.1675 62.2072 9.97197 62.9241 9.38539 62.9893C8.92915 63.1196 8.89656 63.6085 9.28762 64.4557C9.6135 65.2379 9.45056 65.6941 8.7988 65.8245C8.34257 65.8896 8.11445 65.9548 8.11445 66.02C8.11445 66.02 8.37515 66.1503 8.89656 66.411C9.22245 66.5414 9.48315 66.6392 9.67868 66.7043C9.93939 66.7695 10.1349 66.7043 10.2653 66.5088C10.6563 66.1829 11.1451 66.7695 11.7317 68.2686C12.3183 69.7024 13.133 72.1791 14.1758 75.6987C15.4142 80.261 15.8053 82.5748 15.349 82.6399C15.2187 82.6399 15.1535 82.7051 15.1535 82.8355C15.1535 82.9006 15.3164 82.9984 15.6423 83.1288C16.0334 83.3895 16.2289 83.585 16.2289 83.7153C16.2289 83.7805 16.066 83.976 15.7401 84.3019C15.0231 84.6278 15.0557 84.8885 15.8378 85.084C16.0985 85.2144 16.457 85.801 16.9132 86.8438C17.4347 87.8866 17.9887 89.1576 18.5752 90.6566C18.9663 92.0905 19.3899 93.3288 19.8462 94.3717C20.3024 95.3493 20.5957 95.8381 20.7261 95.8381C20.8564 95.8381 21.0519 95.4471 21.3126 94.665C21.6385 93.8828 22.0948 92.6119 22.6814 90.8521C23.2679 89.0924 23.9849 86.746 24.8322 83.8131C25.7446 80.8802 26.8526 77.2303 28.1562 72.8635C28.9383 70.3868 29.5249 68.7574 29.9159 67.9753C30.3722 67.128 30.7958 66.6717 31.1869 66.6066C31.5127 66.6066 31.7083 66.6066 31.7734 66.6066C31.9038 66.5414 31.806 66.4436 31.4802 66.3133C31.0239 66.0526 30.7306 65.5637 30.6003 64.8468C30.4699 64.1299 30.6003 63.5433 30.9913 63.087C31.1217 62.7612 31.3824 61.979 31.7734 60.7407C32.2297 59.5023 32.6859 58.0685 33.1421 56.4391C33.6636 54.8748 34.1198 53.441 34.5108 52.1374C34.9671 50.7687 35.2604 50.0192 35.3907 49.8888C35.5863 49.3674 35.7492 48.846 35.8796 48.3246C36.0751 47.738 36.238 47.184 36.3684 46.6626C36.6943 45.3591 37.0853 44.3814 37.5415 43.7297C37.9978 43.0127 38.5844 42.6543 39.3013 42.6543C39.7575 42.6543 40.2138 42.752 40.67 42.9476C41.1914 43.1431 41.5499 43.3712 41.7454 43.6319C42.0061 43.8926 42.1365 44.3163 42.1365 44.9029C42.1365 45.4894 41.9735 46.3041 41.6477 47.347C41.3218 48.3246 40.8655 49.6607 40.279 51.3553C39.7575 52.8544 39.2687 54.386 38.8125 55.9502C38.3563 57.5145 37.8674 59.0461 37.346 60.5452C37.0201 61.588 36.5965 62.9241 36.0751 64.5535C35.5537 66.1177 35.13 67.5516 34.8041 68.8551C33.9569 71.9184 33.1096 74.8188 32.2623 77.5562C31.4802 80.2936 30.7306 82.7051 30.0137 84.7908C29.3619 86.8764 28.8079 88.6036 28.3517 89.9723C27.8955 91.2758 27.5696 92.0905 27.374 92.4164C27.0482 92.7423 26.8852 93.1333 26.8852 93.5896L25.8098 97.0113C24.4411 100.596 22.7465 102.388 20.7261 102.388C19.6832 102.388 18.673 101.867 17.6954 100.824C17.3695 100.433 17.0762 100.042 16.8155 99.6509C16.5548 99.2599 16.2615 98.7385 15.9356 98.0867C15.6749 97.3698 15.349 96.4573 14.958 95.3493C14.6321 94.2413 14.1758 92.84 13.5893 91.1454C13.1982 90.4937 12.8723 89.7767 12.6116 88.9946C12.4161 88.2125 12.2206 87.6585 12.025 87.3326C11.6991 86.8112 12.025 86.2246 13.0027 85.5729C14.3062 85.1166 14.5017 84.9537 13.5893 85.084C13.0678 85.084 12.6116 84.9537 12.2206 84.693C11.8947 84.3671 11.5688 83.8457 11.2429 83.1288C10.917 82.3466 10.5586 81.3038 10.1675 80.0003C9.77644 78.6968 9.28762 76.9696 8.70104 74.8188C8.04927 72.5376 7.46269 70.4194 6.94128 68.4641C6.48504 66.5088 6.15916 65.3682 5.96363 65.0423C5.63775 64.4557 5.24669 63.4129 4.79046 61.9139C4.33422 60.4148 3.87799 58.8832 3.42176 57.3189C3.0307 55.6895 2.70482 54.1905 2.44411 52.8218C2.18341 51.4531 2.05305 50.6058 2.05305 50.2799C2.18341 49.8237 2.21599 49.4652 2.15082 49.2045C2.08564 48.9438 1.85752 48.7483 1.46647 48.6179ZM3.71505 46.6626C3.32399 46.7278 3.06329 47.1514 2.93293 47.9336C2.80258 48.7157 2.96552 49.3674 3.42176 49.8888C3.94317 50.1496 4.36681 50.0844 4.69269 49.6933C5.01857 49.3023 5.11634 48.7483 4.98599 48.0313C4.98599 47.6403 4.85563 47.347 4.59493 47.1514C4.3994 46.8256 4.10611 46.6626 3.71505 46.6626ZM6.84351 56.2435C6.64798 55.9177 6.51763 55.8199 6.45245 55.9502C6.45245 56.0806 6.48504 56.3739 6.55022 56.8301C6.61539 57.156 6.64798 57.4167 6.64798 57.6122C6.71316 57.7426 6.81092 57.7426 6.94128 57.6122C7.26716 57.2212 7.23457 56.7649 6.84351 56.2435Z"
                fill="#780000"
              ></path>
              <path
                d="M16.9764 -5.54373C14.1087 -5.54373 11.9253 -5.54373 10.4262 -5.54373C8.92715 -5.54373 7.85174 -5.60891 7.19998 -5.73927C6.54821 -5.86962 6.18974 -6.09773 6.12457 -6.42361C5.99421 -6.7495 5.89645 -7.20573 5.83127 -7.79232V-10.0409L11.1106 -10.3342C15.4122 -10.3994 19.0295 -10.432 21.9624 -10.432C24.9605 -10.4971 27.372 -10.4971 29.197 -10.432C31.0871 -10.3668 32.4884 -10.269 33.4008 -10.1387C34.3133 -10.0083 34.8673 -9.7802 35.0628 -9.45431C35.6494 -8.99808 36.0079 -8.76996 36.1383 -8.76996C36.3338 -8.76996 36.5619 -8.83514 36.8226 -8.96549C37.0833 -9.09584 37.4092 -9.25878 37.8002 -9.45431C38.7127 -9.97573 39.4297 -10.2364 39.9511 -10.2364C40.9939 -10.2364 41.5153 -9.32396 41.5153 -7.49903V-5.34821L38.0935 -5.34821C37.1811 -5.34821 36.3664 -5.3808 35.6494 -5.44597C34.9977 -5.57633 34.6066 -5.80444 34.4763 -6.13032C34.3459 -6.45621 34.2481 -6.61915 34.183 -6.61915C34.183 -6.61915 34.183 -6.45621 34.183 -6.13032C34.183 -5.60891 33.1727 -5.34821 31.1523 -5.34821C30.305 -5.34821 29.5554 -5.28303 28.9037 -5.15268C28.3171 -5.02232 28.0238 -4.89197 28.0238 -4.76162C28.0238 -4.37056 27.6979 -4.17503 27.0462 -4.17503C26.4596 -4.17503 26.1011 -3.94692 25.9708 -3.49068C25.9056 -3.09962 26.1663 -2.80633 26.7529 -2.6108C26.9484 -2.48045 27.0787 -2.15457 27.1439 -1.63316C27.2743 -1.17692 27.2743 -0.329632 27.1439 0.908718C27.0787 2.14707 26.9158 3.90683 26.6551 6.188C26.3944 8.40399 26.0359 11.3369 25.5797 14.9868C25.319 17.659 25.0909 20.0705 24.8953 22.2214C24.6998 24.3722 24.5369 26.6208 24.4065 28.9671C24.2762 31.2483 24.1458 33.7902 24.0155 36.5927C23.8851 39.3301 23.7548 42.6541 23.6244 46.5647C23.4941 50.9315 23.3963 54.2229 23.3311 56.4389C23.2659 58.6549 23.1682 60.2191 23.0378 61.1316C22.9075 62.1093 22.7119 62.6307 22.4512 62.6958C22.2557 62.761 21.9298 62.8262 21.4736 62.8914C20.5611 62.8914 19.7138 62.6958 18.9317 62.3048C18.6058 62.1093 18.3777 61.3923 18.2474 60.154C18.1822 58.8504 18.2148 57.4817 18.3451 56.0479C18.4755 54.5488 18.671 53.1475 18.9317 51.844C19.2576 50.4753 19.6161 49.628 20.0071 49.3021C20.5937 48.8459 20.887 48.6178 20.887 48.6178C20.887 48.5526 20.5937 48.5852 20.0071 48.7155C19.7464 48.8459 19.5183 48.8785 19.3228 48.8133C19.1924 48.7481 19.0947 48.3897 19.0295 47.7379C18.9643 47.0209 18.9317 45.9781 18.9317 44.6094C18.9969 43.1755 19.0947 41.1877 19.225 38.6458C19.2902 37.1467 19.3554 35.6151 19.4205 34.0509C19.5509 32.4215 19.6486 30.8572 19.7138 29.3582C19.8442 27.8591 19.9419 26.4578 20.0071 25.1543C20.1375 23.7856 20.2352 22.645 20.3004 21.7325C20.3656 20.8853 20.4308 19.9402 20.4959 18.8974C20.6263 17.7894 20.7566 16.6814 20.887 15.5734C21.0174 14.4654 21.1151 13.4226 21.1803 12.4449C21.3106 11.4021 21.4084 10.4896 21.4736 9.70751C21.6039 8.46917 21.7343 7.2634 21.8646 6.09023C21.995 4.91706 22.2231 3.7113 22.549 2.47295C22.9401 0.778365 23.103 -0.818453 23.0378 -2.31751V-5.54373H16.9764Z"
                fill="#780000"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_800_3247">
                <rect fill="white" height="122.206" width="43.994"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <Image
          src={'/img/home/histoire/histoire_top_3x.png'}
          width={1920}
          height={300}
          className="pointer-events-none absolute -bottom-5 md:hidden"
          alt="Notre Histoire"
        />
      </div>
      {/* HEADING VIDEO */}

      {/* NOTRE HISTOIRE */}
      <Histoire />
      {/* NOTRE HISTOIRE */}

      {/* VIDEOS */}
      <div className="relative flex h-auto w-full items-center justify-center bg-red-carmen sm:min-h-[700px] sm:justify-start">
        <Image
          src={'/img/home/videos/video_top_4x.png'}
          alt="VIDEOS"
          width={1100}
          height={300}
          className="absolute !-top-[55px] -z-[1] w-full sm:!-top-[70px] md:!-top-[120px] lg:!-top-[150px] xl:!-top-[200px]"
        />
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
          <div className="flex max-w-[1400px] flex-col justify-center lg:flex-row">
            <div className="relative order-2 mt-8 h-auto w-full sm:mt-0 sm:px-5">
              <div className="relative mb-14">
                {videosPres?.acf && (
                  <iframe
                    className="relative h-[280px] w-full bg-cover bg-center bg-no-repeat object-cover px-5 md:h-[480px] lg:h-[380px] lg:w-[640px]"
                    src={`${videosPres.acf.url.includes('shorts')
                        ? videosPres.acf.url.replace('shorts', 'embed')
                        : videosPres!.acf.url.replace('watch?v=', 'embed/')
                      }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
                <h3 className="absolute -top-4 left-0 -rotate-6 font-softgank text-2xl text-cream-carmen sm:-top-16 sm:left-36 sm:z-10 sm:rotate-6 sm:text-4xl">
                  VIDÉOS
                </h3>
                <div className="absolute -top-12 right-0 sm:-top-32 sm:left-0">
                  <Image
                    src={'/img/home/videos/videos_appareil.png'}
                    alt="APPAREIL PHOTO"
                    width={100}
                    height={100}
                    className="sm:w-[190px]"
                  />
                </div>
                <div className="absolute -bottom-14 left-0">
                  <Image
                    src={'/img/home/videos/videos_phone.png'}
                    alt="APPAREIL PHOTO"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <div className="order-2 flex h-full w-full flex-col items-center justify-center lg:items-start">
              <h2 className="my-4 font-thunderLC text-7xl text-cream-carmen sm:my-0">
                VIDÉOS
              </h2>
              {screenWidth >= 640 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.[0].acf.video_block_text
                      ? data?.[0].acf.video_block_text
                      : '',
                  }}
                  className="flex-col px-5 text-center font-thunderLC text-cream-carmen sm:px-0 sm:pr-5 lg:text-start lg:text-lg xl:text-xl"
                ></div>
              )}
              {screenWidth < 640 && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.[0].acf.video_block_text
                      ? data?.[0].acf.video_block_text.split('\n')[0]
                      : '',
                  }}
                  className="px-5 text-center font-thunderLC text-cream-carmen sm:hidden sm:px-0 sm:pr-5"
                ></div>
              )}
            </div>
          </div>
          {screenWidth < 640 && (
            <div className="order-3 sm:absolute sm:right-0 sm:top-[405px] sm:hidden sm:w-1/3">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.[0].acf.video_block_text
                    ? data?.[0].acf.video_block_text.split('\n')[1]
                    : '',
                }}
                className="px-5 font-thunderLC text-cream-carmen sm:px-0 sm:pr-5"
              ></div>
            </div>
          )}
          <div className="relative order-3 h-[140px] w-full items-center justify-start sm:flex sm:items-center sm:justify-center">
            <Button
              color="cream-carmen"
              text="VOIR LES VIDEOS"
              textSize="text-xl"
              width="w-[165px]"
              onClick={() => router.push('/videos')}
              height="h-[70px]"
              classes={[
                'absolute',
                'top-[50%]',
                'left-1/2',
                '-translate-x-[50%]',
                '-translate-y-[50%]',
                'sm:!top-[30%]',
              ]}
            />
          </div>
        </div>
      </div>
      {/* VIDEOS */}

      <Fournisseurs />

      {/* LES ACTUALITES CARMEN */}
      <div className="relative bg-red-carmen xl:flex xl:flex-col xl:items-center xl:justify-center">
        <div className="h-[40px] md:h-[100px]"></div>
        <h2 className="flex flex-col items-center justify-center font-thunder text-5xl font-extralight text-cream-carmen">
          Les actualités
          <span className="font-thunderLC font-semibold">Carmen</span>
        </h2>
        <Image
          src={'/img/home/actualites/actualites_top.png'}
          alt="ACUTALITES"
          className="absolute !-top-[35px] w-full object-contain sm:!-top-[70px] lg:!-top-[120px]"
          width={1100}
          height={400}
        />
        <div
          ref={sliderContainer}
          className="relative my-4 flex h-[320px] w-full items-start justify-center overflow-hidden sm:mt-12 sm:h-[520px] sm:items-start"
          onMouseDown={(e) => onSliderClick(e)}
          onTouchStart={(e) => onSliderClick(e)}
          onMouseMove={(e) => onSliderMove(e)}
          onTouchMove={(e) => onSliderMove(e)}
          onMouseLeave={() => onSliderLeave()}
          onMouseUp={() => onSliderLeave()}
          onTouchEnd={() => onSliderLeave()}
        >
          {dataA?.map((actu, idx) => {
            if (idx <= 5)
              return (
                <Actualite
                  key={actu.id}
                  position={idx}
                  screenWidth={screenWidth}
                  addToItems={addToItems}
                  title={actu.acf.title}
                  description={actu.acf.description}
                  intro_actu={actu.acf.intro_actu}
                  thumbnail={actu.acf.thumbnail}
                />
              );
          })}
        </div>
        <div className="mt-24 hidden w-full items-center justify-center sm:flex">
          <Button
            color="cream-carmen"
            text="TOUTES LES ACTUS"
            textSize="text-xl"
            width="w-[165px]"
            height="h-[70px]"
            classes={[
              'absolute',
              'top-[50%]',
              '-left-2',
              '-translate-y-[50%]',
              'sm:!relative',
            ]}
            onClick={() => router.push('/actualites')}
          />
        </div>
        <Image
          src={'/img/home/actualites/actualites_bot_4x.png'}
          alt="ACUTALITES"
          className="absolute !-bottom-[25px] z-[-1] w-full object-contain sm:!-bottom-[50px] lg:!-bottom-[80px] xl:!-bottom-[120px]"
          width={1100}
          height={300}
        />
      </div>
      {/* LES ACTUALITES CARMEN */}

      {/* GALERIE PHOTO */}

      <div className="relative flex flex-col">
        <div className="mb-8 mt-20 flex items-center justify-start">
          <h1 className="ml-20 font-thunder text-5xl text-red-carmen md:ml-20 md:text-7xl lg:ml-72 lg:text-8xl xl:mt-72">
            Galerie Photos
          </h1>
        </div>
        <section className="relative mb-40 flex flex-col items-center justify-center">
          {gridItems?.map((row, idx) => {
            if (idx <= 0) {
              return (
                <div
                  key={`row_${idx}`}
                  className={`galerie_grid ${idx >= 1 && 'dynamic_grid'
                    } grid h-auto auto-rows-fr gap-4 px-4 md:px-20`}
                >
                  {row.map((items, _idx) => {
                    return items;
                  })}
                </div>
              );
            }
          })}

          <div className="absolute bottom-0 flex w-full items-center justify-center">
            <Button
              color="red-carmen"
              text="VOIR LA GALERIE"
              textSize="text-xl"
              width="w-[135px]"
              height="h-[70px]"
              classes={['']}
              onClick={() => router.push('/carmen-en-image')}
            />
          </div>
        </section>
      </div>
      {/* GALERIE PHOTO */}

      {/* CONTACT */}
      <div className="relative h-auto w-full bg-red-carmen sm:flex sm:justify-center">
        <Image
          src={'/img/contact/contact_socials_bot_4x.png'}
          alt="CONTACT"
          width={1920}
          height={400}
          className="absolute -top-[40px] -z-[1]  w-full min-[420px]:-top-[80px] md:-top-[100px] lg:-top-[140px] xl:-top-[220px]"
        />
        {screenWidth < 640 && (
          <>
            <div className="mt-12 flex w-full flex-col">
              <div className="h-[30px]"></div>
              <div className="px-5">
                <h2 className="font-thunder text-8xl text-cream-carmen">
                  Contact
                </h2>
                <div className="flex flex-col">
                  <h3 className="text-sm text-cream-carmen">
                    14 Av. Maurice Hauriou, 31000 Toulouse
                  </h3>
                  <Link
                    prefetch={true}
                    className="text-sm text-cream-carmen"
                    href={'mailto:chezcarmen@contact.com'}
                  >
                    chezcarmen@contact.com
                  </Link>
                  <Link
                    prefetch={true}
                    className="font-semibold text-cream-carmen"
                    href={'http://instagram.com/chezcarmentoulouse'}
                    target="_blank"
                  >
                    @chezcarmentoulouse
                  </Link>
                </div>
              </div>
              <div className="h-auto w-full">
                <div className="relative mt-14 flex justify-start">
                  <Link
                    prefetch={true}
                    className="ml-6 font-thunder text-2xl text-cream-carmen"
                    href={'telto:05 61 42 04 95'}
                  >
                    05 61 42 04 95
                    <svg
                      className="absolute -left-8 top-1/2 translate-y-[-50%]"
                      fill="none"
                      height="144"
                      viewBox="0 0 228 144"
                      width="208"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M206.225 57.1821C205.931 57.2565 205.798 57.2274 205.856 56.9624C205.944 56.565 204.835 54.6554 204.438 54.5682C204.305 54.5391 204.07 54.3485 203.863 54.0254C203.759 53.8638 203.42 53.5117 203.052 53.292C202.654 53.2047 202.344 52.7201 202.137 52.3969C202.063 52.1029 201.695 51.8832 201.562 51.8541C201.297 51.796 201.194 51.6344 201.223 51.5019C201.252 51.3695 201.016 51.1788 200.648 50.9591C200.279 50.7394 199.808 50.3582 199.468 50.006C199.1 49.7863 198.761 49.4341 198.628 49.405C197.995 49.1271 197.258 48.6877 197.316 48.4228C197.345 48.2903 197.213 48.2612 197.081 48.2321C197.051 48.3646 196.683 48.1449 196.344 47.7927C195.694 46.9559 195.09 46.5455 194.693 46.4583C194.428 46.4002 194.266 46.5036 194.105 46.607C193.914 46.8428 193.649 46.7847 193.678 46.6522C193.794 46.1223 192.909 45.0948 192.379 44.9785C192.114 44.9204 191.746 44.7007 191.642 44.5391C191.407 44.3485 191.067 43.9963 190.537 43.88C190.14 43.7927 189.639 43.544 189.432 43.2209C189.226 42.8977 189.093 42.8687 188.902 43.1045C188.579 43.3113 188.579 43.3113 188.608 43.1789C188.667 42.9139 188.431 42.7233 188.166 42.6651C187.768 42.5779 187.4 42.3582 187.193 42.0351C186.883 41.5504 185.881 41.0529 184.424 40.733C184.027 40.6458 183.526 40.397 183.451 40.103C183.216 39.9123 182.847 39.6926 182.686 39.796C182.421 39.7379 182.156 39.6797 182.052 39.5182C181.978 39.2241 180.343 38.4487 179.151 38.187C178.621 38.0707 178.253 37.851 178.017 37.6603C177.913 37.4988 177.648 37.4406 177.619 37.5731C177.487 37.544 176.853 37.2662 176.088 36.9592C174.821 36.4035 174.217 35.9932 173.819 35.9059C173.554 35.8478 173.393 35.9512 173.364 36.0837C173.202 36.1871 173.099 36.0255 172.863 35.8349C172.656 35.5118 171.787 35.0433 170.992 34.8688C170.226 34.5619 169.196 34.1968 168.827 33.9771C168.695 33.948 168.562 33.9189 168.43 33.8899C168.165 33.8317 168.003 33.9351 167.842 34.0385C167.651 34.2744 167.519 34.2453 167.179 33.8931C166.973 33.57 166.074 33.234 165.044 32.8689C163.984 32.6363 162.556 32.1839 161.893 32.0386C161.127 31.7316 159.037 31.1339 157.315 30.7559C155.622 30.2454 153.237 29.722 152.339 29.386C151.279 29.1534 150.455 29.1114 150.426 29.2439C150.426 29.2439 150.293 29.2148 150.058 29.0242C149.954 28.8626 147.864 28.2649 145.877 27.8288C143.889 27.3926 142.006 27.118 141.844 27.2214C141.682 27.3248 141.418 27.2667 141.049 27.0469C140.946 26.8854 140.71 26.6948 140.445 26.6366C140.312 26.6075 140.151 26.7109 140.018 26.6819C139.724 26.7562 138.93 26.5817 138.267 26.4363C137.472 26.2619 136.942 26.1456 136.884 26.4105C136.855 26.543 136.59 26.4848 136.251 26.1326C136.148 25.9711 135.883 25.9129 135.618 25.8548C135.353 25.7966 134.955 25.7094 134.529 25.7546C133.411 25.787 132.219 25.5253 131.159 25.2927C130.629 25.1764 130.335 25.2507 130.306 25.3832C130.248 25.6481 130.248 25.6481 130.012 25.4575C129.776 25.2669 129.01 24.9599 128.215 24.7854C127.553 24.6401 126.994 24.6562 126.965 24.7887C126.965 24.7887 126.7 24.7306 126.17 24.6142C124.978 24.3525 123.785 24.0909 122.535 24.0941C121.976 24.1103 121.152 24.0683 120.754 23.9811C120.357 23.8938 119.96 23.8066 119.798 23.91C119.636 24.0134 119.239 23.9262 118.842 23.8389C118.473 23.6192 118.047 23.6645 118.018 23.7969C117.856 23.9004 117.562 23.9747 117.223 23.6225C117.119 23.4609 116.854 23.4028 116.59 23.3446C116.457 23.3155 116.325 23.2865 116.163 23.3899C115.869 23.4642 114.913 23.3931 114.118 23.2187C113.323 23.0442 112.366 22.9731 112.072 23.0475C111.778 23.1218 111.484 23.1961 111.513 23.0636C111.543 22.9312 111.381 23.0346 111.19 23.2704C110.867 23.4772 110.735 23.4482 110.631 23.2866C110.528 23.125 110.16 22.9053 109.762 22.8181C109.497 22.76 109.203 22.8343 109.174 22.9667C109.145 23.0992 108.748 23.012 108.35 22.9248C106.76 22.5758 104.686 22.5371 104.23 22.7148C104.069 22.8182 103.775 22.8926 103.804 22.7601C103.804 22.7601 103.407 22.6728 102.715 22.6599C102.156 22.6761 101.067 22.576 100.376 22.5631C99.5809 22.3886 98.8894 22.3757 98.8313 22.6406C98.6697 22.744 97.8458 22.7021 97.0509 22.5276C95.2997 22.2821 94.0492 22.2853 93.9911 22.5503C93.962 22.6828 93.8004 22.7861 93.5646 22.5955C93.1962 22.3758 86.2525 22.3792 85.9003 22.7185C85.9003 22.7185 85.4738 22.7637 85.0764 22.6765C84.7824 22.7508 84.3559 22.7961 84.3268 22.9285C84.2977 23.061 84.0328 23.0029 83.826 22.6797C83.6935 22.6507 83.5901 22.4891 83.4576 22.46C83.1927 22.4019 82.8986 22.4762 82.443 22.6539C82.0165 22.6992 81.031 22.7606 80.3396 22.7477C79.4123 22.5441 78.9567 22.7219 78.9276 22.8543C78.8694 23.1193 78.5754 23.1936 78.0455 23.0773C76.8532 22.8156 74.0292 23.0289 73.942 23.4264C73.9129 23.5588 73.6189 23.6331 73.2214 23.5459C72.824 23.4587 70.7787 23.2875 70.6624 23.8174C70.6333 23.9499 70.3393 24.0242 69.9709 23.8045C69.7351 23.6139 69.441 23.6882 69.412 23.8207C69.3829 23.9531 69.0889 24.0274 68.9564 23.9984C67.8966 23.7658 65.764 23.992 65.1178 24.4056C64.6332 24.7158 64.0742 24.7319 63.8383 24.5413C63.5733 24.4832 63.3084 24.425 63.2502 24.69C63.2212 24.8224 62.9271 24.8968 62.5297 24.8095C62.2647 24.7514 61.9707 24.8257 61.9707 24.8257C61.9416 24.9582 61.3536 25.1068 60.6621 25.0939C59.9997 24.9485 59.4117 25.0972 59.3826 25.2296C59.3535 25.3621 59.221 25.333 58.9561 25.2749C58.8236 25.2458 58.5005 25.4526 58.2065 25.5269C58.0159 25.7628 57.5893 25.8081 57.3244 25.7499C57.0594 25.6917 56.8979 25.7951 56.8688 25.9276C56.8397 26.0601 56.6782 26.1635 56.5457 26.1344C56.4132 26.1053 56.2807 26.0763 56.1483 26.0472C55.6184 25.9309 55.1919 25.9761 55.1337 26.2411C55.0755 26.506 54.7815 26.5804 54.3841 26.4931C53.9867 26.4059 53.8251 26.5093 53.7669 26.7742C53.7379 26.9067 53.4148 27.1135 53.1789 26.9229C52.2516 26.7193 51.825 26.7646 51.7087 27.2945C51.5181 27.5304 51.2241 27.6047 50.9591 27.5465C50.2967 27.4012 41.1236 29.9701 41.0364 30.3675C41.0073 30.5 40.7133 30.5743 40.3159 30.4871C39.786 30.3708 39.3595 30.416 39.1688 30.6519C39.1398 30.7844 38.6842 30.9621 38.2577 31.0074C37.3756 31.2303 36.4935 31.4533 36.1413 31.7926C36.1122 31.925 35.2301 32.148 34.348 32.371C32.7454 32.7135 32.0701 33.2596 32.0572 33.951C32.0281 34.0835 31.6307 33.9963 31.2624 33.7766C30.4966 33.4696 29.3948 34.061 29.2203 34.8558C29.1331 35.2532 28.9715 35.3566 28.6032 35.1369C28.2348 34.9172 26.3382 35.3341 26.2509 35.7315C26.2219 35.864 25.8987 36.0708 25.4432 36.2485C24.8551 36.3972 24.5029 36.7364 24.4448 37.0014C24.3575 37.3988 24.0635 37.4731 23.7986 37.415C23.0037 37.2405 18.7161 40.3263 16.9261 42.1552C16.7645 42.2586 16.4123 42.5979 16.2217 42.8337C15.8986 43.0405 15.708 43.2764 15.6498 43.5414C15.5916 43.8063 15.2395 44.1456 14.9164 44.3524C14.5933 44.5592 14.3735 44.9275 14.3445 45.06C14.3154 45.1925 14.0957 45.5609 13.8016 45.6352C13.2879 46.0779 11.9697 48.288 12.0731 48.4495C12.1765 48.6111 11.8986 49.2444 11.4883 49.8486C10.9616 50.9827 10.9325 51.1152 11.2718 51.4674C11.8179 52.1427 11.7597 52.4076 11.2298 52.2913C10.5674 52.146 10.128 52.8827 10.4382 53.3673C10.5125 53.6614 10.4835 53.7938 10.3219 53.8972C9.73386 54.0459 9.10394 60.7117 9.63384 60.828C9.76632 60.8571 9.70817 61.122 9.65001 61.387C9.50463 62.0494 9.84716 63.652 10.0378 63.4161C10.1703 63.4452 10.1121 63.7101 9.96673 64.3725C9.29469 66.169 8.4967 70.4374 8.61627 71.1579C8.69059 71.4519 8.72293 72.5699 8.88774 73.7169C8.92008 74.8349 9.14304 75.717 9.408 75.7752C9.54047 75.8042 9.64387 75.9658 9.45324 76.2017C9.23353 76.57 9.41452 78.276 9.67947 78.3342C9.81194 78.3633 10.0187 78.6864 10.064 79.1129C10.1092 79.5394 10.287 79.995 10.4194 80.0241C10.5519 80.0531 10.6553 80.2147 10.5972 80.4796C10.539 80.7446 10.6424 80.9061 10.7749 80.9352C11.1723 81.0225 11.6893 81.8302 11.4987 82.0661C11.1465 82.4054 12.2419 85.0064 12.6393 85.0936C12.9043 85.1518 12.9786 85.4458 12.9204 85.7108C12.8041 86.2407 13.1143 86.7253 13.8801 87.0323C14.41 87.1486 14.4843 87.4426 14.3971 87.84C14.3842 88.5315 15.5507 90.1761 16.2874 90.6155C16.5523 90.6737 16.8625 91.1584 16.8044 91.4233C16.8787 91.7173 17.0855 92.0404 17.3214 92.2311C17.5863 92.2892 17.8222 92.4799 17.7931 92.6123C17.7641 92.7448 17.9999 92.9354 18.1324 92.9645C18.3974 93.0227 18.5008 93.1842 18.4717 93.3167C18.4426 93.4492 18.546 93.6107 18.811 93.6689C18.9434 93.698 19.1502 94.0211 19.2246 94.3151C19.2698 94.7416 19.3732 94.9032 19.7997 94.8579C20.0937 94.7836 20.3296 94.9742 20.2424 95.3717C20.4201 95.8272 20.7885 96.047 21.7158 96.2505C21.9807 96.3086 22.0841 96.4702 22.0841 96.4702C21.9969 96.8676 24.0326 98.9807 24.7693 99.4202C25.2992 99.5365 25.7709 99.9177 25.8452 100.212C25.9486 100.373 26.1845 100.564 26.3461 100.461C26.4786 100.49 26.7435 100.548 26.8469 100.709C27.0537 101.032 28.6596 101.94 29.4254 102.247C29.5578 102.276 30.1621 102.687 30.7954 102.965C31.2962 103.213 32.1654 103.682 32.8278 103.827C33.3577 103.944 33.9619 104.354 34.0653 104.515C34.1687 104.677 34.4046 104.868 34.6695 104.926C34.9345 104.984 35.096 104.881 35.361 104.939C35.8909 105.055 36.6858 105.229 37.025 105.582C37.3934 105.801 38.8216 106.254 39.8814 106.486C41.0446 106.88 42.1044 107.113 42.2078 107.275C42.3112 107.436 42.5761 107.494 42.7959 107.126C42.9865 106.89 43.119 106.919 43.3258 107.242C43.5326 107.565 43.93 107.653 44.1949 107.711C44.4599 107.769 44.7248 107.827 44.7539 107.695C44.8121 107.43 44.9446 107.459 45.3129 107.678C45.5488 107.869 46.977 108.321 48.5667 108.67C50.5538 109.106 52.7025 109.439 53.129 109.394C53.4521 109.187 54.5119 109.42 55.9692 109.74C56.3666 109.827 56.764 109.914 57.1615 110.001C58.0888 110.205 58.6478 110.189 58.8094 110.085C58.9709 109.982 59.9273 110.053 61.5461 110.269C64.3281 110.88 65.5495 111.009 66.0051 110.832C66.1375 110.861 66.535 110.948 66.7999 111.006C67.1974 111.093 67.5948 111.18 67.8145 110.812C68.2992 110.502 68.4316 110.531 68.6675 110.722C68.7709 110.883 69.2717 111.132 69.9341 111.277C70.9939 111.51 72.5093 111.565 73.7598 111.562C74.4222 111.707 75.9666 111.629 77.188 111.759C78.5709 111.784 80.0863 111.839 80.4837 111.927C81.0427 111.91 82.1316 112.011 82.8231 112.023C83.4855 112.169 84.3094 112.211 84.4709 112.107C84.6616 111.872 85.059 111.959 85.1624 112.12C85.4274 112.178 85.5598 112.208 85.7214 112.104L86.9718 112.101C87.2368 112.159 87.5599 111.952 87.618 111.687C87.7344 111.157 87.7344 111.157 87.9121 111.613C87.9864 111.907 88.5163 112.023 89.0462 112.14C90.371 112.43 92.3129 112.44 94.1805 112.156C94.342 112.052 95.0044 112.198 95.5634 112.181C97.1531 112.53 99.1984 112.702 99.654 112.524C99.948 112.45 100.772 112.492 101.463 112.504C102.979 112.559 103.567 112.411 103.418 111.823C103.373 111.396 103.505 111.425 103.948 111.939C104.287 112.291 104.42 112.32 104.685 112.378C104.95 112.437 105.215 112.495 105.641 112.449C106.333 112.462 106.921 112.314 107.053 112.343C108.54 112.53 109.952 112.424 110.113 112.32C110.142 112.188 110.54 112.275 110.908 112.495C111.305 112.582 111.57 112.64 111.732 112.537C111.923 112.301 112.614 112.314 113.438 112.356C114.233 112.53 114.953 112.41 115.115 112.307C116.042 112.511 117.425 112.536 118.278 112.446C119.396 112.414 120.647 112.41 121.309 112.556C121.868 112.54 122.456 112.391 122.618 112.288C122.941 112.081 123.5 112.065 124.059 112.048C126.207 112.381 128.12 112.523 128.178 112.258C128.207 112.126 128.34 112.155 128.605 112.213C128.708 112.375 128.973 112.433 129.002 112.3C129.164 112.197 129.458 112.123 129.855 112.21C130.12 112.268 131.238 112.236 132.356 112.203C133.342 112.142 135.019 112.093 135.843 112.135C136.666 112.177 137.946 112.042 138.534 111.893C139.226 111.906 139.652 111.861 140.314 112.006C140.712 112.093 141.403 112.106 141.962 112.09C142.418 111.912 143.271 111.822 143.801 111.938C144.227 111.893 144.919 111.906 145.184 111.964C145.478 111.89 146.302 111.932 146.89 111.783C147.449 111.767 148.405 111.838 148.832 111.793C149.362 111.909 150.082 111.789 150.376 111.715C150.67 111.641 151.097 111.595 151.362 111.654C151.597 111.844 151.862 111.902 151.891 111.77C151.921 111.637 152.215 111.563 152.744 111.679C153.171 111.634 153.73 111.618 153.892 111.515C154.053 111.411 154.318 111.469 154.318 111.469C154.421 111.631 154.848 111.586 155.407 111.569C155.995 111.421 156.848 111.33 157.407 111.314C157.937 111.43 158.392 111.253 158.392 111.253C158.422 111.12 158.877 110.943 159.275 111.03C159.834 111.014 160.363 111.13 160.657 111.056C160.922 111.114 161.349 111.069 161.672 110.862C161.834 110.758 162.554 110.639 163.217 110.784C163.908 110.797 164.496 110.648 164.658 110.545C164.687 110.413 165.246 110.396 165.672 110.351C166.202 110.467 166.761 110.451 166.923 110.348C167.084 110.244 167.246 110.141 167.349 110.303C167.585 110.493 169.291 110.312 169.349 110.047C169.378 109.915 169.672 109.841 169.937 109.899C170.335 109.986 170.732 110.073 170.894 109.97C171.055 109.866 171.643 109.718 172.335 109.731C172.629 109.656 175.937 109.133 176.07 109.162C176.335 109.22 176.761 109.175 177.217 108.997C177.643 108.952 178.658 108.758 179.246 108.609C179.967 108.49 180.716 108.238 181.01 108.163C181.172 108.06 181.598 108.015 181.996 108.102C182.393 108.189 182.687 108.115 182.745 107.85C182.804 107.585 183.098 107.511 183.495 107.598C183.892 107.685 184.451 107.669 184.48 107.536C184.642 107.433 184.936 107.359 185.201 107.417C185.466 107.475 185.76 107.401 185.76 107.401C185.951 107.165 189.905 106.228 191.508 105.885C191.935 105.84 192.258 105.633 192.316 105.368C192.374 105.103 192.536 105 192.668 105.029C193.36 105.042 193.919 105.026 194.08 104.922C194.109 104.79 194.859 104.538 195.608 104.286C196.329 104.166 197.108 103.782 197.298 103.546C197.356 103.281 197.65 103.206 197.915 103.265C198.445 103.381 199.754 103.113 199.812 102.848C199.841 102.715 200.135 102.641 200.429 102.567C200.856 102.521 201.473 102.24 201.957 101.93C202.442 101.62 202.898 101.442 203.03 101.471C203.163 101.5 203.809 101.087 204.588 100.702C205.366 100.318 206.145 99.9331 206.277 99.9622C206.41 99.9913 206.468 99.7263 206.452 99.1673C206.465 98.4759 206.597 98.5049 206.995 98.5922C208.055 98.8248 208.804 98.5727 208.891 98.1753C208.95 97.9104 209.14 97.6745 209.405 97.7326C209.538 97.7617 209.993 97.584 210.316 97.3772C211.505 96.3884 212.723 95.2672 212.752 95.1347C212.782 95.0023 213.134 94.663 213.618 94.3528C214.617 93.5999 215.189 92.8923 214.953 92.7017C214.614 92.3495 214.95 91.4512 215.376 91.406C216.581 90.9762 218.833 85.7773 218.051 84.9114C217.948 84.7498 217.932 84.1908 218.106 83.396C218.542 81.4088 217.65 77.8804 216.322 76.3392C216.161 76.4426 216.19 76.3102 216.248 76.0452C216.306 75.7803 215.641 74.3844 214.71 72.9304C213.912 71.5055 213.217 70.2422 213.246 70.1097C213.304 69.8447 213.127 69.3892 212.846 68.772C212.697 68.184 212.342 67.2728 212.193 66.6847C212.044 66.0967 211.705 65.7445 211.44 65.6863C211.175 65.6282 211.043 65.5991 211.101 65.3342C211.217 64.8043 210.593 62.5845 210.196 62.4973C210.063 62.4682 209.724 62.116 209.546 61.6604C208.6 59.6474 206.548 56.9754 206.225 57.1821ZM210.371 90.1686C210.827 89.9908 211.208 89.5191 211.324 88.9892C211.573 88.4883 211.851 87.855 211.967 87.3251C212.216 86.8243 212.523 86.0585 212.639 85.5286C212.859 85.1603 213.033 84.3654 213.253 83.9971C213.34 83.5996 213.486 82.9372 213.676 82.7014C213.764 82.3039 213.764 82.3039 213.912 82.892C214.09 83.3476 214.297 83.6707 214.562 83.7288C214.959 83.8161 214.623 84.7143 214.167 84.8921C213.873 84.9664 213.699 85.7612 213.379 87.2185C212.943 89.2056 212.914 89.3381 212.297 89.6192C211.841 89.7969 211.518 90.0037 211.621 90.1653C211.592 90.2978 211.24 90.6371 210.726 91.0797C210.242 91.3899 210.08 91.4933 209.948 91.4642C209.948 91.4642 209.948 91.4642 210.006 91.1993C210.226 90.8309 210.255 90.6985 209.99 90.6403C209.857 90.6112 209.915 90.3463 210.371 90.1686ZM209.214 92.2753C209.537 92.0685 209.699 91.9651 209.67 92.0975C209.641 92.23 209.45 92.4659 209.127 92.6727C208.672 92.8504 208.51 92.9538 208.539 92.8213C208.539 92.8213 208.759 92.453 209.214 92.2753ZM161.948 36.2164C162.346 36.3036 162.772 36.2584 162.905 36.2875C163.199 36.2131 163.302 36.3747 163.376 36.6687C163.318 36.9337 165.276 37.5023 165.541 37.5605C165.91 37.7802 166.675 38.0871 167.205 38.2034C167.706 38.4522 168.236 38.5685 168.472 38.7591C168.708 38.9498 168.973 39.0079 169.163 38.7721C169.325 38.6687 169.457 38.6977 169.561 38.8593C169.664 39.0208 169.9 39.2115 170.165 39.2696C171.225 39.5022 172.123 39.8383 172.462 40.1904C173.39 40.394 174.185 40.5684 175.054 41.0369C176.792 41.9739 177.794 42.4715 178.456 42.6169C178.854 42.7041 179.119 42.7623 179.309 42.5264C179.661 42.1871 179.661 42.1871 179.603 42.4521C179.487 42.982 180.091 43.3923 180.857 43.6993C181.122 43.7574 181.519 43.8446 181.623 44.0062C181.726 44.1677 182.359 44.4456 182.889 44.5619C183.552 44.7073 184.185 44.9852 184.259 45.2792C184.495 45.4698 185.129 45.7477 185.658 45.864C185.923 45.9222 186.056 45.9512 186.321 46.0094C186.453 46.0385 186.822 46.2582 186.896 46.5522C186.97 46.8462 187.471 47.095 187.839 47.3147C188.237 47.4019 188.738 47.6507 188.945 47.9738C189.048 48.1354 189.313 48.1936 189.71 48.2808C189.843 48.3099 189.975 48.3389 190.108 48.368C190.373 48.4262 190.534 48.3228 190.667 48.3518C190.799 48.3809 190.903 48.5425 190.874 48.6749C190.815 48.9399 193.042 50.8171 193.365 50.6103C193.497 50.6394 193.63 50.6685 193.601 50.801C193.572 50.9334 194.043 51.3147 194.544 51.5635C195.074 51.6798 195.413 52.032 195.384 52.1645C195.384 52.1645 195.62 52.3551 195.885 52.4132C196.15 52.4714 196.725 53.0142 197.168 53.528C197.611 54.0417 198.525 54.9367 199.233 55.5086C200.073 56.1096 200.619 56.7848 200.693 57.0789C200.767 57.3729 200.974 57.696 201.372 57.7832C202.241 58.2517 202.58 58.6039 202.994 59.2501C203.142 59.8382 203.113 59.9707 202.583 59.8544C202.053 59.7381 201.847 59.4149 201.772 59.1209C201.756 58.5619 201.181 58.0191 200.784 57.9319C200.651 57.9028 200.519 57.8737 200.49 58.0062C200.299 58.2421 200.166 58.213 199.96 57.8899C199.708 57.1403 198.661 56.2162 198.131 56.0999C197.866 56.0418 197.497 55.822 197.291 55.4989C197.055 55.3083 196.819 55.1177 196.686 55.0886C196.525 55.192 196.422 55.0304 196.318 54.8689C196.215 54.7073 195.507 54.1354 194.903 53.7251C194.166 53.2857 193.194 52.6556 192.854 52.3035C192.515 51.9513 191.882 51.6734 191.749 51.6443C191.455 51.7187 191.323 51.6896 191.381 51.4246C191.41 51.2921 191.174 51.1015 191.042 51.0724C190.777 51.0143 190.408 50.7946 190.069 50.4424C189.155 49.5474 185.177 47.4246 184.854 47.6314C184.663 47.8673 184.663 47.8673 184.692 47.7348C184.751 47.4699 184.382 47.2502 183.881 47.0014C183.484 46.9142 182.615 46.4457 182.143 46.0644C181.671 45.6831 180.935 45.2437 180.67 45.1856C180.272 45.0983 179.639 44.8205 179.167 44.4392C178.828 44.087 178.459 43.8673 177.93 43.751C177.797 43.7219 177.665 43.6929 177.4 43.6347C177.135 43.5766 176.708 43.6218 176.576 43.5927C176.311 43.5346 176.207 43.373 176.207 43.373C176.295 42.9756 174.585 41.9061 173.29 41.4829C172.656 41.205 172.023 40.9271 171.891 40.8981C171.684 40.575 171.021 40.4296 170.491 40.3133C170.094 40.226 169.697 40.1388 169.668 40.2713C169.638 40.4038 169.506 40.3747 169.373 40.3456C169.241 40.3165 169.109 40.2875 168.902 39.9643C168.488 39.3181 167.958 39.2018 167.296 39.0564C166.898 38.9692 166.663 38.7786 166.559 38.617C166.352 38.2939 165.984 38.0742 165.822 38.1776C165.822 38.1776 165.69 38.1485 165.557 38.1194C165.16 38.0322 164.527 37.7544 163.893 37.4765C162.995 37.1405 162.494 36.8917 162.229 36.8335C161.964 36.7754 161.832 36.7463 161.803 36.8788C161.612 37.1147 161.48 37.0856 161.405 36.7916C161.228 36.336 161.257 36.2035 161.948 36.2164ZM160.462 36.029C160.594 36.0581 160.698 36.2197 160.669 36.3521C160.64 36.4846 160.478 36.588 160.478 36.588C160.346 36.5589 160.242 36.3974 160.271 36.2649C160.168 36.1033 160.197 35.9709 160.462 36.029ZM159.27 35.7673C159.535 35.8255 159.638 35.987 159.609 36.1195C159.58 36.252 159.079 36.0032 158.976 35.8417C158.901 35.5476 159.034 35.5767 159.27 35.7673ZM156.649 35.0533C156.782 35.0824 156.914 35.1115 157.047 35.1405C157.15 35.3021 157.018 35.273 156.885 35.2439C156.62 35.1858 156.62 35.1858 156.649 35.0533ZM151.408 33.6253C151.541 33.6543 151.541 33.6543 151.512 33.7868C151.512 33.7868 151.483 33.9193 151.35 33.8902L151.247 33.7287C151.276 33.5962 151.408 33.6253 151.408 33.6253ZM87.1089 29.2324C87.403 29.1581 87.5354 29.1871 87.6388 29.3487C87.7713 29.3778 87.4773 29.4521 87.2123 29.3939C86.9474 29.3358 86.9765 29.2033 87.1089 29.2324ZM85.167 29.2227C85.2995 29.2518 85.2995 29.2518 85.2704 29.3843C85.2704 29.3843 85.2413 29.5168 85.1089 29.4877L85.0055 29.3261C85.0346 29.1937 85.167 29.2227 85.167 29.2227ZM84.0781 29.1226C84.5208 29.6363 84.5208 29.6363 84.0652 29.8141C83.7712 29.8884 83.6387 29.8593 83.5062 29.8302C83.3738 29.8011 83.3738 29.8011 83.2994 29.5071C83.1508 28.9191 83.238 28.5216 83.503 28.5798C83.6355 28.6089 83.8713 28.7995 84.0781 29.1226ZM82.3269 28.8771C82.3269 28.8771 82.4593 28.9061 82.4303 29.0386L82.2687 29.142C82.1362 29.1129 82.1653 28.9805 82.1653 28.9805C82.1944 28.848 82.1944 28.848 82.3269 28.8771ZM80.3559 28.9999C80.4884 29.029 80.4884 29.029 80.4593 29.1614C80.4593 29.1614 80.4302 29.2939 80.2977 29.2648L80.1943 29.1033C80.2234 28.9708 80.3559 28.9999 80.3559 28.9999ZM79.6353 29.1195C79.7387 29.281 79.7097 29.4135 79.5481 29.5169C79.3866 29.6203 79.4156 29.4878 79.4447 29.3553C79.5029 29.0904 79.5029 29.0904 79.6353 29.1195ZM78.3558 29.2552C78.6499 29.1809 78.7533 29.3424 78.5626 29.5783C78.3429 29.9467 78.4754 29.9757 78.0036 29.5945C77.7968 29.2714 77.9293 29.3004 78.3558 29.2552ZM44.9752 34.5647C45.4018 34.5194 45.5924 34.2835 45.5181 33.9895C45.4728 33.563 45.9575 33.2528 46.7523 33.4273C47.0173 33.4854 47.6053 33.3368 48.09 33.0266C48.6781 32.8779 49.5892 32.5225 50.3098 32.4029C51.9124 32.0604 53.9706 31.5401 54.6621 31.553C54.8236 31.4496 55.1177 31.3753 55.1467 31.2428C55.1758 31.1104 55.6023 31.0651 56.2647 31.2105C56.7946 31.3268 57.3536 31.3107 57.6476 31.2363C57.8092 31.1329 59.3827 30.9229 61.0888 30.7419C62.9273 30.59 64.5008 30.3799 64.6914 30.1441C64.853 30.0407 65.2795 29.9954 65.5445 30.0536C66.5009 30.1246 68.6043 30.0309 69.2215 29.7498C69.5155 29.6754 69.8095 29.6011 70.0454 29.7917C70.3104 29.8499 70.4428 29.879 70.501 29.614C70.5591 29.3491 70.7207 29.2457 71.2215 29.4945C71.7514 29.6108 72.1779 29.5655 72.7369 29.5494C73.4575 29.4298 75.0019 29.3522 75.7968 29.5267C75.9293 29.5557 76.2233 29.4814 76.3848 29.378C76.5464 29.2746 76.6789 29.3037 76.6789 29.3037C76.8114 29.3328 76.6207 29.5687 76.2685 29.9079C76.0779 30.1438 76.0488 30.2763 75.7839 30.2181C75.6514 30.1891 75.5189 30.16 75.4155 29.9984C75.283 29.9693 75.1796 29.8078 75.0472 29.7787C74.7822 29.7206 74.4882 29.7949 74.1942 29.8692C73.9001 29.9435 72.8856 30.1374 72.1941 30.1245C69.7966 30.2926 69.2376 30.3087 69.2086 30.4412C69.1795 30.5737 68.8854 30.648 68.6205 30.5899C68.3555 30.5317 67.635 30.6513 66.9145 30.7708C66.2973 31.052 65.6059 31.0391 65.3409 30.9809C65.076 30.9227 64.1939 31.1457 63.3118 31.3687C62.4297 31.5916 61.5476 31.8146 61.1502 31.7274C60.8852 31.6692 60.5912 31.7436 60.5621 31.876C60.4296 31.847 59.8416 31.9956 59.121 32.1152C58.4296 32.1023 57.709 32.2218 57.6509 32.4868C57.4893 32.5902 57.1953 32.6645 56.7979 32.5773C56.5329 32.5191 56.2389 32.5934 56.2098 32.7259C56.1807 32.8584 55.8867 32.9327 55.7542 32.9036C55.4893 32.8455 55.3277 32.9489 55.1662 33.0523C55.108 33.3172 54.6815 33.3625 54.2841 33.2752C53.3277 33.2042 50.2549 33.9183 50.1677 34.3158C50.1095 34.5807 49.977 34.5516 49.8445 34.5226C49.8445 34.5226 49.7411 34.361 49.6087 34.3319C49.3437 34.2738 48.7557 34.4224 48.83 34.7164C48.9043 35.0105 48.6393 34.9523 48.2419 34.8651C48.1094 34.836 47.977 34.8069 47.977 34.8069C47.712 34.7488 47.418 34.8231 47.2564 34.9265C47.0949 35.0299 46.6393 35.2076 46.2128 35.2529C45.2273 35.3143 43.405 36.0252 43.3177 36.4226C43.2886 36.5551 42.9946 36.6294 42.7297 36.5712C41.9348 36.3968 43.476 35.0688 44.9752 34.5647ZM41.8023 36.3677C41.9348 36.3968 41.9348 36.3968 41.9057 36.5293C41.7732 36.5002 41.6408 36.4711 41.6408 36.4711C41.6698 36.3386 41.8023 36.3677 41.8023 36.3677ZM41.0656 35.9283C41.1981 35.9574 41.3306 35.9864 41.4631 36.0155C41.434 36.148 41.4049 36.2805 41.1399 36.2223C41.0075 36.1932 40.9041 36.0317 41.0656 35.9283ZM16.1024 53.4997C15.8084 53.574 15.6177 53.8099 15.5886 53.9423C15.5305 54.2073 15.3399 54.4432 15.0458 54.5175C14.8843 54.6209 14.5321 54.9602 14.4739 55.2251C14.4158 55.4901 14.2252 55.726 14.0927 55.6969C13.9602 55.6678 14.0765 55.1379 14.3544 54.5046C15.1427 52.1782 15.259 51.6483 15.0231 51.4576C14.9197 51.2961 15.1104 51.0602 15.4626 50.7209C16.1088 50.3073 17.9408 47.6545 17.7049 47.4639C17.734 47.3314 18.0861 46.9922 18.7324 46.5786C19.3495 46.2974 19.7308 45.8257 19.7598 45.6932C19.7889 45.5607 20.3027 45.1181 20.6548 44.7788C21.1104 44.6011 21.4917 44.1293 21.5208 43.9968C21.5498 43.8643 21.7405 43.6285 22.0054 43.6866C22.2994 43.6123 22.461 43.5089 22.3576 43.3474C22.2833 43.0533 22.4158 43.0824 22.4158 43.0824C22.8132 43.1696 26.2349 40.8658 26.1606 40.5717C26.1606 40.5717 26.3512 40.3359 26.7486 40.4231C27.1751 40.3778 27.4692 40.3035 27.4982 40.171C27.5273 40.0386 27.6889 39.9352 27.8214 39.9642C27.9538 39.9933 28.7325 39.6088 29.3787 39.1952C30.054 38.6491 30.9652 38.2937 31.2592 38.2194C31.8182 38.2032 31.9798 38.0998 31.8311 37.5117C31.6534 37.0562 31.6825 36.9237 32.1833 37.1725C32.6841 37.4213 33.9637 37.2855 34.0218 37.0206C34.0509 36.8881 34.2124 36.7847 34.4774 36.8428C34.7423 36.901 34.7714 36.7685 34.8296 36.5036C34.7553 36.2095 34.9168 36.1061 35.1818 36.1643C35.3142 36.1934 35.6083 36.119 35.6373 35.9866C35.6373 35.9866 36.0929 35.8088 36.4904 35.8961C36.7553 35.9542 36.9169 35.8508 37.0493 35.8799C37.1818 35.909 37.2852 36.0705 37.0655 36.4389C36.8458 36.8072 36.7876 37.0722 36.891 37.2338C37.4662 37.7766 36.8943 38.4842 35.4985 39.1498C34.5873 39.5053 33.912 40.0514 33.7214 40.2872C33.5017 40.6556 33.311 40.8915 33.2076 40.7299C32.8102 40.6427 31.9281 40.8656 31.6793 41.3665C31.4887 41.6023 30.8425 42.0159 30.416 42.0612C29.4014 42.2551 26.9781 43.8061 26.8909 44.2035C26.8618 44.336 26.3771 44.6462 25.9506 44.6914C25.4951 44.8691 25.0395 45.0469 25.0104 45.1793C24.9813 45.3118 24.4676 45.7545 23.8504 46.0356C23.3367 46.4783 22.852 46.7885 22.823 46.921C22.7939 47.0534 22.2801 47.4961 21.7664 47.9388C20.8262 48.4267 20.7971 48.5592 20.9748 49.0148C21.1816 49.3379 21.1525 49.4704 20.6226 49.354C20.0927 49.2377 18.8294 49.9325 19.0071 50.388C18.9489 50.653 18.4643 50.9632 17.9505 51.4059C17.3043 51.8195 16.7615 52.3946 16.7034 52.6596C16.6452 52.9245 16.4255 53.2929 16.1024 53.4997ZM12.6067 72.5892C12.6067 72.5892 12.6358 72.4567 12.7683 72.4858L12.8717 72.6474C12.8426 72.7798 12.7101 72.7508 12.7101 72.7508C12.5777 72.7217 12.5777 72.7217 12.6067 72.5892ZM81.4142 107.687C81.2527 107.791 80.4287 107.749 79.7663 107.603C79.104 107.458 78.574 107.342 78.545 107.474C78.5159 107.607 77.8244 107.594 76.8971 107.39C76.1022 107.216 74.8518 107.219 74.4253 107.264C73.8663 107.28 72.7774 107.18 72.115 107.035C71.3202 106.86 70.6287 106.847 70.5996 106.98C70.5706 107.112 70.4381 107.083 70.0697 106.864C69.8048 106.805 69.4073 106.718 69.2458 106.822C69.0842 106.925 67.9663 106.957 67.0389 106.754C65.9791 106.521 65.1552 106.479 64.9936 106.583C64.8612 106.554 64.5962 106.495 64.4637 106.466C64.2279 106.276 64.0663 106.379 64.0081 106.644C63.95 106.909 63.7884 107.012 63.656 106.983C63.5235 106.954 63.4201 106.793 63.3167 106.631C63.3458 106.499 62.9483 106.411 62.6834 106.353C62.4184 106.295 62.021 106.208 61.8594 106.311C61.727 106.282 60.7706 106.211 59.7107 105.979C57.0031 105.662 54.2954 105.345 51.6458 104.764C51.1159 104.648 50.8219 104.722 50.6603 104.825C50.3372 105.032 50.1757 105.135 50.1014 104.841C49.998 104.68 49.5262 104.299 49.1288 104.211C48.8638 104.153 48.7314 104.124 48.7023 104.257C48.7023 104.257 47.7459 104.186 46.5536 103.924C44.8314 103.546 42.6084 102.919 41.3127 102.496C40.5469 102.189 39.2512 101.766 38.5888 101.62C37.9264 101.475 37.1606 101.168 36.6598 100.919C36.4239 100.728 36.1881 100.538 36.0556 100.509C35.9231 100.48 35.7616 100.583 35.7616 100.583C35.7325 100.716 35.6 100.687 35.3351 100.628C34.9376 100.541 34.3334 100.131 33.6258 99.5589C33.154 99.1776 32.5207 98.8998 32.3592 99.0032C32.0942 98.945 31.8293 98.8869 31.6225 98.5638C31.5191 98.4022 31.2541 98.344 31.1216 98.315C30.9601 98.4184 30.7242 98.2277 30.4883 98.0371C30.2815 97.714 29.7807 97.4652 29.5157 97.4071C29.2508 97.3489 28.5432 96.777 27.8355 96.2051C27.1279 95.6332 26.5527 95.0904 26.3912 95.1938C26.2296 95.2972 25.9938 95.1066 25.9194 94.8125C25.816 94.651 25.5802 94.4604 25.3152 94.4022C25.1827 94.3731 25.1537 94.5056 25.0212 94.4765C24.6238 94.3893 24.3136 93.9046 23.7222 92.8028C23.412 92.3182 22.7044 91.7463 22.2327 91.365C21.6284 90.9547 21.1858 90.4409 21.2439 90.176C21.1987 89.7495 21.0953 89.5879 20.9337 89.6913C20.9337 89.6913 20.6978 89.5007 20.491 89.1776C20.2842 88.8545 20.1808 88.6929 20.0484 88.6639C19.9159 88.6348 19.9159 88.6348 19.7543 88.7382C19.4603 88.8125 19.2987 88.9159 19.1663 88.8868C19.0338 88.8577 19.0629 88.7253 19.2826 88.3569C19.3698 87.9595 19.0887 87.3424 17.7445 85.2422C16.8139 83.7882 15.9867 82.4957 16.0158 82.3633C16.0739 82.0983 15.8381 81.9077 15.5731 81.8495C15.4406 81.8204 15.3082 81.7914 15.1466 81.8948C14.6619 82.205 14.691 82.0725 14.9398 81.5717C15.3501 80.9674 15.2758 80.6734 14.552 79.5425C14.0059 78.8672 13.7539 78.1176 13.783 77.9851C14.0027 77.6168 13.7183 75.7492 13.5858 75.7201C13.4534 75.6911 13.2756 75.2355 13.3338 74.9705C13.2885 74.544 13.1851 74.3825 12.9202 74.3243C12.9202 74.3243 12.7877 74.2952 12.6552 74.2662C12.0963 74.2823 12.0963 74.2823 12.5518 74.1046C12.8749 73.8978 13.1981 73.691 13.2562 73.426C13.4468 73.1902 13.5502 73.3517 13.6698 74.0723C13.9509 74.6894 14.1868 74.88 14.4518 74.9382C14.8783 74.8929 14.9817 75.0545 15.0269 75.481C15.0302 76.7314 17.7024 80.3729 18.4229 80.2533C18.8204 80.3405 18.9528 80.3696 18.8947 80.6346C18.8365 80.8995 18.9399 81.0611 19.3373 81.1483C19.6023 81.2064 19.6766 81.5005 19.6475 81.633C19.5603 82.0304 20.8593 83.7041 21.2567 83.7913C21.3892 83.8204 21.7284 84.1726 22.0677 84.5247C22.2745 84.8479 22.7753 85.0966 23.1728 85.1839C23.4377 85.242 23.6736 85.4327 23.6445 85.5651C23.5864 85.8301 24.9726 87.1063 25.6349 87.2517C25.8999 87.3099 26.3716 87.6912 26.8143 88.2049C27.1536 88.5571 27.8612 89.129 28.3911 89.2453C28.892 89.4941 29.4962 89.9044 29.7321 90.095C29.8064 90.3891 30.3072 90.6378 30.7046 90.7251C31.1021 90.8123 31.9422 91.4133 32.4139 91.7945C33.0182 92.2049 33.6224 92.6152 33.7839 92.5118C33.9164 92.5409 34.1814 92.599 34.2848 92.7606C34.4916 93.0837 35.7291 93.7719 37.2607 94.3858C37.7615 94.6346 38.2623 94.8834 38.5273 94.9415C38.6307 95.1031 39.0281 95.1903 39.1315 95.3519C39.3965 95.41 39.7648 95.6297 40.1622 95.7169C40.3981 95.9076 40.6631 95.9657 40.8246 95.8623C41.0153 95.6265 41.2511 95.8171 41.5904 96.1693C41.7972 96.4924 42.5339 96.9318 43.1963 97.0772C43.8587 97.2226 44.5954 97.662 44.8313 97.8526C45.1996 98.0723 45.8329 98.3502 46.3337 98.599C48.4243 99.1967 49.455 99.5618 49.6909 99.7524C49.9559 99.8106 50.3242 100.03 50.4567 100.059C50.7216 100.117 51.3549 100.395 52.1498 100.57C54.3437 101.329 56.5668 101.956 58.8189 102.45C58.848 102.318 59.0095 102.214 59.2745 102.272C59.4069 102.302 59.6428 102.492 59.6137 102.625C59.5847 102.757 59.6881 102.919 59.953 102.977C60.3504 103.064 60.512 102.961 60.5411 102.828C60.5992 102.563 60.8351 102.754 61.0419 103.077C61.2487 103.4 61.617 103.62 61.882 103.678C62.147 103.736 62.3085 103.633 62.3376 103.5C62.3957 103.235 62.5282 103.264 62.7641 103.455C63.2649 103.704 64.8256 104.185 66.0179 104.447C66.8127 104.621 67.3426 104.738 67.5042 104.634C67.5623 104.369 67.8273 104.427 68.0632 104.618C68.1666 104.78 71.052 105.552 73.1716 106.017C74.4964 106.308 75.5562 106.54 75.5852 106.408C75.6143 106.275 77.0716 106.595 78.8228 106.841C80.81 107.277 81.7082 107.613 81.4142 107.687ZM206.235 95.0929C206.206 95.2254 206.132 94.9313 206.19 94.6664C206.248 94.4014 206.381 94.4305 206.352 94.563C206.426 94.857 206.397 94.9895 206.235 95.0929ZM206.742 69.3764C206.742 69.3764 206.949 69.6995 207.259 70.1842C207.569 70.6688 207.879 71.1535 208.144 71.2116C208.277 71.2407 208.38 71.4023 208.351 71.5347C208.322 71.6672 208.455 71.6963 208.72 71.7544C209.014 71.6801 209.117 71.8417 209.059 72.1066C209.03 72.2391 209.104 72.5331 209.207 72.6947C209.547 73.0469 210.038 75.2376 209.818 75.6059C209.657 75.7093 209.586 76.6657 209.647 77.6512C209.679 78.7692 209.579 79.8581 209.579 79.8581C209.418 79.9615 209.492 80.2555 209.595 80.4171C209.831 80.6077 209.802 80.7402 209.612 80.976C209.45 81.0794 209.056 82.2427 208.794 83.4349C208.474 84.8922 208.138 85.7904 207.948 86.0263C207.654 86.1006 207.405 86.6015 207.318 86.9989C207.201 87.5288 206.982 87.8972 206.82 88.0006C206.688 87.9715 206.629 88.2364 206.6 88.3689C206.675 88.6629 206.484 88.8988 206.322 89.0022C205.999 89.209 205.97 89.3415 206.206 89.5321C206.339 89.5612 205.986 89.9005 205.34 90.3141C204.826 90.7567 203.931 91.6712 203.521 92.2754C202.978 92.8506 202.597 93.3223 202.465 93.2932C202.332 93.2641 202.171 93.3675 202.141 93.5C202.083 93.765 201.54 94.3401 200.733 94.8571C199.925 95.3741 199.382 95.9493 199.353 96.0818C199.456 96.2433 199.162 96.3176 198.897 96.2595C198.633 96.2013 198.015 96.4824 197.663 96.8217C197.253 97.4259 196.019 97.9882 195.401 98.2693C194.755 98.6829 194.271 98.9931 194.138 98.964C193.741 98.8768 191.905 100.279 191.847 100.544C192.025 101 191.569 101.177 191.363 100.854C191.259 100.693 191.127 100.664 190.994 100.635C190.464 100.518 189.847 100.799 189.951 100.961C190.054 101.123 189.76 101.197 189.495 101.139C189.098 101.051 188.215 101.274 187.598 101.556C186.981 101.837 186.232 102.089 186.099 102.06C185.967 102.031 185.805 102.134 185.511 102.208C185.32 102.444 184.277 102.771 183.101 103.068C181.146 103.75 179.572 103.96 177.572 104.215C177.117 104.393 176.396 104.512 175.837 104.528C175.249 104.677 174.823 104.722 174.794 104.855C174.764 104.987 174.205 105.003 173.646 105.02C173.087 105.036 172.528 105.052 172.499 105.184C172.441 105.449 172.441 105.449 172.338 105.288C172.234 105.126 168.69 105.459 167.779 105.815C167.485 105.889 167.191 105.963 166.926 105.905C166.793 105.876 166.367 105.921 165.94 105.966C165.646 106.041 164.499 106.206 163.543 106.135C162.557 106.196 161.704 106.286 161.675 106.419C161.485 106.655 161.058 106.7 160.661 106.613C160.263 106.526 159.439 106.484 158.984 106.661C158.425 106.678 157.704 106.797 157.439 106.739C157.042 106.652 156.615 106.697 156.321 106.771C155.998 106.978 155.572 107.023 155.468 106.862C155.336 106.833 154.777 106.849 154.218 106.865C153.63 107.014 152.938 107.001 152.541 106.914C152.143 106.826 151.688 107.004 151.526 107.107C151.203 107.314 150.909 107.389 150.673 107.198C150.541 107.169 150.541 107.169 150.408 107.14C150.143 107.082 149.746 106.994 149.584 107.098C149.158 107.143 147.452 107.324 145.642 107.343C141.891 107.353 139.361 107.492 138.906 107.67C138.744 107.773 137.817 107.57 136.728 107.47C135.668 107.237 134.55 107.269 134.256 107.344C133.933 107.55 133.241 107.538 132.844 107.45C132.314 107.334 131.888 107.379 131.726 107.483C131.697 107.615 131.299 107.528 130.902 107.441C130.77 107.412 130.637 107.383 130.637 107.383C130.24 107.295 129.946 107.37 129.652 107.444C129.358 107.518 129.196 107.622 128.931 107.563C128.799 107.534 128.695 107.373 128.563 107.344C128.356 107.021 128.223 106.992 128.165 107.257C128.136 107.389 127.842 107.463 127.606 107.273C127.341 107.215 127.076 107.156 126.915 107.26C126.886 107.392 126.621 107.334 126.385 107.143C126.12 107.085 125.296 107.043 124.546 107.295C123.958 107.444 123.693 107.386 123.428 107.328C123.163 107.27 123.031 107.241 122.928 107.079C122.692 106.888 122.559 106.859 122.265 106.934C122.104 107.037 121.118 107.098 120.323 106.924C118.44 106.649 117.322 106.682 117.263 106.947C117.234 107.079 116.704 106.963 116.042 106.817C115.645 106.73 115.541 106.569 115.276 106.51C115.011 106.452 114.982 106.585 114.924 106.85C114.837 107.247 114.704 107.218 114.336 106.998C113.835 106.75 113.599 106.559 113.334 106.501C112.937 106.414 112.775 106.517 112.452 106.724C112.233 107.092 111.939 107.166 111.864 106.872C111.628 106.682 110.863 106.375 110.2 106.229C109.67 106.113 109.111 106.129 109.082 106.262C109.053 106.394 108.627 106.44 108.097 106.323C107.169 106.12 105.551 105.903 105.389 106.007C105.257 105.978 104.727 105.861 104.168 105.877C101.489 105.428 99.7088 105.315 98.4874 105.186C97.2369 105.189 96.413 105.147 94.4259 104.711C94.0284 104.624 93.337 104.611 93.1754 104.714C93.0139 104.818 92.0865 104.614 91.1592 104.411C90.0994 104.178 89.4079 104.165 89.2464 104.269C89.2173 104.401 89.0848 104.372 88.9523 104.343C88.8199 104.314 88.5549 104.256 88.319 104.065C87.9216 103.978 87.3917 103.862 86.9943 103.774C86.8036 104.01 86.2737 103.894 85.7438 103.778C85.3464 103.69 84.8165 103.574 84.6549 103.677C84.5225 103.648 83.4626 103.416 82.4028 103.183C80.9456 102.863 80.3866 102.879 80.196 103.115C80.1669 103.248 79.8729 103.322 79.7695 103.161C79.5336 102.97 78.1054 102.518 76.7807 102.227C75.9858 102.052 75.1619 102.01 75.0294 101.981C75.0003 102.114 74.7354 102.056 74.6029 102.027C74.367 101.836 74.2055 101.939 74.0439 102.043C74.0148 102.175 73.8823 102.146 73.6174 102.088C73.4849 102.059 73.22 102.001 72.8516 101.781C72.4542 101.694 71.9243 101.577 71.5268 101.49C71.2328 101.565 71.1003 101.536 70.9679 101.506C70.8645 101.345 69.5688 100.922 68.6414 100.718C67.8466 100.544 67.2876 100.56 67.2876 100.56L67.2585 100.692C67.2004 100.957 66.6995 100.708 66.2278 100.327C66.1244 100.166 64.9321 99.9039 63.6364 99.4807C61.2518 98.9573 59.6912 98.4759 57.4972 97.7166C55.6716 97.1771 53.9785 96.6666 52.1239 96.2595C51.594 96.1432 51.2256 95.9235 50.5923 95.6456C49.1189 94.7668 47.0574 94.0366 45.8942 93.6424C45.3643 93.5261 44.6276 93.0867 44.2592 92.867C43.8909 92.6473 42.9926 92.3113 42.4627 92.195C41.9619 91.9462 41.2995 91.8008 41.1961 91.6392C40.9602 91.4486 40.4885 91.0674 39.9586 90.951C39.4287 90.8347 38.692 90.3953 38.3236 90.1756C37.9843 89.8234 37.616 89.6037 37.4835 89.5746C37.322 89.678 36.9536 89.4583 36.5852 89.2386C36.3784 88.9155 36.1135 88.8574 35.981 88.8283C35.8485 88.7992 35.7161 88.7701 35.5545 88.8735C35.393 88.9769 35.393 88.9769 35.2605 88.9479C35.128 88.9188 35.0246 88.7572 34.6853 88.405C34.4785 88.0819 34.0068 87.7007 33.7418 87.6425C33.4769 87.5844 33.1376 87.2322 32.9308 86.9091C32.6949 86.7184 32.5915 86.5569 32.459 86.5278C32.3266 86.4987 32.165 86.6021 32.0325 86.5731C31.871 86.6765 31.871 86.6765 31.7385 86.6474C31.606 86.6183 31.3702 86.4277 31.2958 86.1336C31.1181 85.6781 30.7788 85.3259 30.7788 85.3259C30.4848 85.4002 30.0131 85.0189 28.9371 84.2273C28.2004 83.7879 27.3603 83.1869 26.7851 82.6441C26.21 82.1013 25.3699 81.5003 25.134 81.3097C24.7656 81.09 24.5298 80.8994 24.4264 80.7378C24.2196 80.4147 22.6557 78.6829 22.3907 78.6247C22.2582 78.5956 21.7121 77.9203 21.1661 77.2451C20.6491 76.4373 20.103 75.762 19.9705 75.7329C19.9705 75.7329 19.5279 75.2192 19.2177 74.7345C18.9365 74.1174 18.2871 73.2805 17.9478 72.9284C17.5051 72.4146 17.224 71.7975 17.1497 71.5034C17.2369 71.106 16.9267 70.6214 16.7199 70.2982C16.3806 69.9461 16.1738 69.623 16.2029 69.4905C16.232 69.358 16.0833 68.7699 15.7731 68.2853C15.5954 67.8297 15.2981 66.6536 15.0461 65.904C14.8231 65.0219 14.4386 64.2432 14.2027 64.0525C13.9668 63.8619 13.9959 63.7294 14.6421 63.3158C14.9943 62.9766 15.3465 62.6373 15.4337 62.2399C15.4919 61.9749 15.7407 61.4741 16.0638 61.2673C16.416 60.928 16.445 60.7955 16.2382 60.4724C15.8246 59.8262 15.8537 59.6937 16.6615 59.1767C17.6017 58.6888 18.9071 57.1702 19.0525 56.5078C19.1106 56.2428 19.3012 56.0069 19.5953 55.9326C19.8893 55.8583 20.4612 55.1507 20.71 54.6498C20.7391 54.5174 20.9006 54.414 21.0912 54.1781C21.2528 54.0747 21.5759 53.8679 21.605 53.7354C21.6631 53.4705 21.9862 53.2637 22.3094 53.0569C22.7649 52.8791 23.088 52.6723 22.9556 52.6433C22.9846 52.5108 23.3368 52.1715 23.7181 51.6998C24.5549 51.0503 24.584 50.9178 24.2738 50.4332C24.067 50.11 24.0218 49.6835 24.1542 49.7126C24.3158 49.6092 24.4483 49.6383 24.5226 49.9323C24.626 50.0939 24.7294 50.2554 24.9944 50.3136C25.3918 50.4008 25.9798 50.2522 26.0962 49.7223C26.1543 49.4573 26.374 49.089 26.668 49.0146C27.7117 48.6883 33.337 45.2018 33.3951 44.9368C33.4242 44.8043 33.7183 44.73 33.9832 44.7882C34.2482 44.8463 34.5422 44.772 34.6003 44.5071C34.6585 44.2421 34.82 44.1387 35.1141 44.0644C36.1286 43.8705 38.8622 42.8042 38.9494 42.4067C39.14 42.1709 39.14 42.1709 39.3468 42.494C39.5245 42.9495 40.1578 43.2274 40.6877 43.3437C40.8202 43.3728 41.0852 43.4309 41.1143 43.2985C41.3049 43.0626 41.4374 43.0917 41.7023 43.1498C41.8348 43.1789 41.9382 43.3405 42.0707 43.3695C42.6006 43.4858 42.8203 43.1175 42.6426 42.6619C42.4358 42.3388 42.3614 42.0448 42.4939 42.0738C42.6264 42.1029 43.1111 41.7927 43.4923 41.321C44.1224 40.3484 44.7686 39.9348 45.166 40.022C46.0933 40.2256 47.7832 39.4856 47.6346 38.8975C47.6184 38.3386 47.6184 38.3386 47.9577 38.6907C48.0611 38.8523 48.326 38.9104 48.591 38.9686C48.9884 39.0558 49.4149 39.0106 49.5021 38.6132C49.5894 38.2157 49.7218 38.2448 50.3842 38.3902C50.5167 38.4193 50.6492 38.4483 50.7817 38.4774C51.0466 38.5356 51.2082 38.4322 51.3697 38.3288C51.4279 38.0638 51.8544 38.0186 52.1193 38.0767C52.7817 38.2221 54.8399 37.7019 54.9272 37.3044C54.9562 37.172 55.0887 37.201 55.2212 37.2301C55.3246 37.3917 55.7511 37.3464 56.1776 37.3012C58.3974 36.6775 61.1761 36.0377 61.4411 36.0959C61.706 36.154 62.4266 36.0344 63.3086 35.8115C65.0728 35.3655 67.0729 35.1102 67.7353 35.2556C67.8677 35.2847 68.2943 35.2395 68.4558 35.1361C68.6464 34.9002 69.367 34.7806 69.8969 34.8969C70.5883 34.9098 71.5738 34.8484 72.1619 34.6998C72.75 34.5511 73.603 34.4606 74.0004 34.5479C74.3978 34.6351 74.8243 34.5899 74.8825 34.3249C75.044 34.2215 75.6321 34.0729 76.456 34.1148C77.1475 34.1278 77.839 34.1407 77.868 34.0082C77.8971 33.8757 78.0296 33.9048 78.1621 33.9339C78.2655 34.0954 78.5304 34.1536 78.8535 33.9468C79.0151 33.8434 79.5741 33.8272 79.8681 33.7529C80.7954 33.9564 83.3545 33.6849 84.1041 33.4329C84.4272 33.2261 84.8537 33.1809 84.9571 33.3424C85.0605 33.504 85.3545 33.4296 85.6486 33.3553C85.8101 33.2519 86.2366 33.2067 86.4725 33.3973C86.605 33.4264 86.7374 33.4555 86.7665 33.323C86.7956 33.1905 87.0896 33.1162 87.2221 33.1453C87.3255 33.3068 87.8845 33.2907 88.311 33.2454C91.2384 33.1936 91.3709 33.2227 91.4872 32.6928C91.5744 32.2954 91.7069 32.3245 92.0462 32.6766C92.282 32.8673 92.4145 32.8964 92.547 32.9254C92.6795 32.9545 92.9444 33.0127 93.106 32.9093C93.5325 32.864 93.959 32.8188 94.2239 32.8769C94.5923 33.0966 94.8863 33.0223 94.9154 32.8898C95.0479 32.9189 95.7684 32.7993 96.5633 32.9738C97.3872 33.0158 98.0787 33.0287 98.2693 32.7928C98.4309 32.6894 99.1223 32.7023 99.7847 32.8477C100.58 33.0222 101.006 32.9769 101.226 32.6086C101.387 32.5052 101.71 32.2984 101.946 32.489C102.211 32.5472 102.58 32.7669 102.948 32.9866C103.316 33.2063 103.449 33.2354 103.536 32.8379C103.594 32.573 103.756 32.4696 104.124 32.6893C104.919 32.8638 107.097 33.064 107.743 32.6504C107.904 32.547 108.169 32.6052 108.434 32.6634C108.832 32.7506 109.229 32.8378 109.627 32.9251C110.186 32.9089 111.01 32.9509 111.54 33.0672C112.098 33.051 113.055 33.1221 113.585 33.2384C114.276 33.2513 114.997 33.1317 115.158 33.0283C115.349 32.7924 115.614 32.8506 115.85 33.0412C116.247 33.1285 116.645 33.2157 117.042 33.3029C117.307 33.3611 117.572 33.4192 117.837 33.4774C118.102 33.5355 118.499 33.6228 118.822 33.416C118.984 33.3126 119.411 33.2673 119.646 33.458C120.015 33.6777 120.309 33.6033 120.338 33.4709C120.499 33.3675 121.323 33.4095 122.251 33.613C123.178 33.8165 123.973 33.991 124.134 33.8876C124.296 33.7842 124.987 33.7971 125.782 33.9716C126.577 34.146 127.269 34.1589 127.327 33.894C127.488 33.7906 127.65 33.6872 127.782 33.7163C128.047 33.7744 128.283 33.9651 128.652 34.1848C128.887 34.3754 129.123 34.566 129.152 34.4335C129.211 34.1686 132.949 34.8503 136.128 35.5481C138.38 36.0424 140.339 36.6111 140.574 36.8017C140.707 36.8308 140.707 36.8308 140.5 36.5077C140.426 36.2136 140.057 35.9939 139.925 35.9649C139.763 36.0683 139.528 35.8776 139.292 35.687C139.217 35.393 138.878 35.0408 138.348 34.9245C137.98 34.7048 137.744 34.5141 137.905 34.4107C138.067 34.3073 138.361 34.233 138.597 34.4236C139.098 34.6724 141.453 35.3283 143.573 35.7935C145.03 36.1134 146.516 36.3007 146.781 36.3589C147.075 36.2846 147.208 36.3137 147.34 36.3427C147.605 36.4009 147.709 36.5624 147.812 36.724C148.019 37.0471 148.255 37.2377 148.52 37.2959C148.52 37.2959 148.681 37.1925 148.71 37.06C148.769 36.7951 148.901 36.8241 149.137 37.0148C149.476 37.367 151.935 38.1844 155.189 39.1763C156.749 39.6577 157.942 39.9194 159.341 40.5041C159.709 40.7239 160.872 41.118 161.903 41.4831C162.934 41.8482 164.333 42.433 165.099 42.74C165.865 43.0469 166.527 43.1923 166.659 43.2214C166.821 43.118 167.057 43.3086 167.16 43.4701C167.396 43.6608 167.897 43.9096 168.53 44.1874C169.031 44.4362 170.194 44.8304 170.931 45.2698C171.697 45.5767 172.33 45.8546 172.463 45.8837C172.463 45.8837 172.566 46.0452 172.698 46.0743C172.698 46.0743 173.067 46.294 173.464 46.3812C174.627 46.7754 175.629 47.273 176.204 47.8158C176.573 48.0355 176.941 48.2552 177.102 48.1518C177.235 48.1809 177.5 48.239 177.603 48.4006C177.839 48.5912 178.311 48.9725 178.973 49.1179C179.636 49.2633 180.269 49.5411 180.372 49.7027C180.505 49.7318 181.581 50.5234 182.922 51.3731C184.159 52.0613 185.869 53.1308 186.605 53.5702C187.313 54.1421 187.946 54.4199 188.211 54.4781C188.344 54.5072 188.815 54.8884 189.287 55.2697C189.788 55.5185 190.26 55.8997 190.392 55.9288C190.392 55.9288 190.893 56.1776 191.261 56.3973C191.762 56.6461 192.367 57.0564 192.573 57.3795C192.78 57.7027 193.016 57.8933 193.148 57.9224C193.31 57.819 193.782 58.2002 194.357 58.743C194.961 59.1534 195.698 59.5928 195.963 59.651C196.095 59.68 196.67 60.2228 197.142 60.6041C197.585 61.1178 198.292 61.6897 198.69 61.777C199.087 61.8642 199.662 62.407 199.973 62.8917C200.415 63.4054 200.858 63.9192 201.123 63.9773C201.255 64.0064 201.727 64.3876 201.905 64.8432C202.112 65.1663 202.244 65.1954 202.377 65.2245C202.509 65.2536 202.642 65.2826 202.671 65.1502C202.832 65.0468 202.936 65.2083 203.113 65.6639C203.291 66.1195 203.365 66.4135 203.527 66.3101C203.659 66.3392 203.895 66.5298 203.999 66.6914C204.206 67.0145 204.441 67.2051 204.574 67.2342C204.706 67.2633 204.81 67.4248 205.046 67.6155C206.241 69.1276 206.684 69.6413 206.742 69.3764Z"
                        fill="#FEF6E6"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex h-auto w-full items-center justify-center">
                <div className="relative flex h-[250px] w-[300px]">
                  <Image
                    src={'/img/home/contact/contact_nada_2x.png'}
                    width={174}
                    height={217}
                    alt="CONTACT"
                    className="absolute -top-20 right-0"
                  />
                  <Image
                    src={'/img/home/contact/contact_ph_2x.png'}
                    width={180}
                    height={27}
                    alt="CONTACT"
                    className="absolute left-[45%] top-[20%] z-[19]"
                  />

                  <Image
                    src={'/img/home/contact/contact_tel_2x.png'}
                    width={130}
                    height={50}
                    alt="CONTACT"
                    className="absolute left-[25%] z-[18]"
                  />
                  <Image
                    src={'/img/home/contact/contact_phone_2x.png'}
                    width={250}
                    height={70}
                    alt="CONTACT"
                    className="absolute left-0 top-[100px] z-20"
                  />
                </div>
              </div>
              <div className="relative flex items-center justify-center overflow-hidden">
                <div className="flex h-auto w-full items-center justify-center">
                  <Image
                    src={'/img/home/contact/map_top.png'}
                    width={600}
                    height={300}
                    alt="GOOGLE MAP"
                    className="absolute left-0 top-0"
                  />

                  <Image
                    src={'/img/home/contact/map_ph.png'}
                    width={600}
                    height={300}
                    alt="GOOGLE MAP"
                  />

                  <Image
                    src={'/img/home/contact/map_top.png'}
                    width={600}
                    height={300}
                    alt="GOOGLE MAP"
                    className="absolute -bottom-1 left-0 rotate-180"
                  />
                </div>
              </div>
            </div>
            <div className="mt-16 flex h-auto px-5">
              <div className="w-auto">
                <h2 className="font-thunder text-5xl text-cream-carmen">
                  Horaires
                </h2>
                <p className="font-thunderLC text-xl text-cream-carmen">
                  Ouvert tous les jours midi et soir sauf dimanche et lundi.
                </p>
              </div>
              <div className="relative h-[220px] w-full">
                <Image
                  src={'/img/home/contact/horraires_ph.png'}
                  alt="HORRAIRES"
                  width={111}
                  height={128}
                  className="absolute !-right-5 -top-12 object-contain"
                />
                <Image
                  src={'/img/home/contact/clock.png'}
                  alt="HORRAIRES"
                  width={163}
                  height={185}
                  className="absolute !-right-14 top-16 object-contain"
                />

                <h4 className="absolute right-0 top-12 rotate-12 font-softgank text-5xl text-cream-carmen">
                  OPEN
                </h4>
              </div>
            </div>
          </>
        )}
        {screenWidth >= 640 && (
          <>
            <div className="relative h-full min-h-[650px] w-[500px] p-5">
              <Image
                className="absolute left-5 top-0"
                src={'/img/home/contact/contact_nada_2x.png'}
                alt="CONTACT"
                width={200}
                height={300}
              />
              <Image
                className="absolute left-0 top-[140px] z-20"
                src={'/img/home/contact/contact_tel_2x.png'}
                width={250}
                height={300}
                alt="CONTACT"
              />
              <Image
                className="absolute -right-16 top-[90px] z-10"
                src={'/img/home/contact/contact_panneau_2x.png'}
                width={350}
                height={350}
                alt="CONTACT"
              />
              <Image
                className="absolute bottom-4 right-10 z-20 rotate-12"
                src={'/img/home/contact/contact_phone_2x.png'}
                width={250}
                height={300}
                alt="CONTACT"
              />
              <Image
                className="absolute left-1/2 top-1/3 translate-x-[-50%]"
                src={'/img/home/contact/contact_road_2x.png'}
                width={200}
                height={300}
                alt="CONTACT"
              />
              <Image
                className="absolute bottom-20 left-0 -rotate-[25deg]"
                src={'/img/home/contact/contact_ph_2x.png'}
                width={200}
                height={300}
                alt="CONTACT"
              />
            </div>
            <div className="h-full w-1/3 space-y-5">
              <div className="mt-8 flex flex-col items-start justify-center space-y-3">
                <h2 className="font-thunder text-6xl text-cream-carmen">
                  Contact
                </h2>
                <div className="flex flex-col">
                  <h3 className="font-thunder text-xl text-cream-carmen">
                    14 Av. Maurice Hauriou, 31000 Toulouse
                  </h3>
                  <Link
                    prefetch={true}
                    href={'telto:05.61.42.04.95'}
                    className="font-thunder text-xl font-semibold text-cream-carmen"
                  >
                    05.61.42.04.95
                  </Link>
                </div>
                <div className="flex flex-col">
                  <Link
                    prefetch={true}
                    href={'mailto:chezcarmen@contact.com'}
                    className="font-thunder text-xl text-cream-carmen"
                  >
                    chezcarmen@contact.com
                  </Link>
                  <Link
                    prefetch={true}
                    className="font-thunder text-xl font-semibold text-cream-carmen"
                    href={'http://instagram.com/chezcarmentoulouse'}
                    target="_blank"
                  >
                    @chezcarmentoulouse
                  </Link>
                </div>
              </div>
              <div className="relative flex items-center justify-center overflow-hidden">
                <div className="flex h-auto w-full items-center justify-center">
                  <Image
                    src={'/img/home/contact/map_top.png'}
                    width={600}
                    height={300}
                    alt="GOOGLE MAP"
                    className="absolute left-0 top-0"
                  />

                  <Image
                    src={'/img/home/contact/map_ph.png'}
                    width={600}
                    height={300}
                    alt="GOOGLE MAP"
                  />

                  <Image
                    src={'/img/home/contact/map_top.png'}
                    width={600}
                    height={300}
                    alt="GOOGLE MAP"
                    className="absolute -bottom-1 left-0 rotate-180"
                  />
                </div>
              </div>
              <div className="w-auto">
                <h2 className="font-thunder text-5xl text-cream-carmen">
                  Horaires
                </h2>
                <p className="font-thunderLC text-xl text-cream-carmen">
                  Ouvert tous les jours midi et soir sauf dimanche et lundi.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      {/* CONTACT */}
    </>
  );
};
