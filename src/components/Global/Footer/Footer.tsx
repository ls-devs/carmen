'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IOptions } from '@/types/types';
import { fetchOptions } from '@/utils/fetchs/fetchs';
import { block } from 'million/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Footer = /* optimize */ block(() => {
  const path = usePathname();
  const [route, setRoute] = useState<string>('');
  const { data } = useQueryUtils<IOptions>({
    qKey: ['getOptions'],
    qFn: () => fetchOptions(),
  });

  useEffect(() => {
    setRoute(path);
  }, [path]);
  return (
    <footer
      className={`${
        route === '/actualites' || route === '/la-carte'
          ? 'bg-red-carmen'
          : 'bg-cream-carmen'
      } flex-center relative mt-20 h-auto w-full space-y-3`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center space-y-2 p-3 min-[425px]:flex-row md:my-12 md:items-center md:justify-between">
        <div className="flex-center relative mt-20 h-full w-full min-[425px]:-mt-3 min-[425px]:w-9/12 min-[575px]:w-4/6 md:-mt-4 md:w-1/3 lg:mt-4 xl:mt-6 2xl:mt-8">
          <Link href={'/'}>
            {data && (
              <Image
                src={`${
                  (route === '/actualites' && data) ||
                  (route === '/la-carte' && data)
                    ? data.acf.logo_carmen_creme
                    : data?.acf.logo_carmen_red
                }`}
                width={300}
                height={300}
                alt="Carmen Logo Footer"
              />
            )}
          </Link>
        </div>
        <h3
          className={`absolute top-7 font-thunder text-2xl font-bold ${
            route === '/actualites' || route === '/la-carte'
              ? 'text-cream-carmen'
              : 'text-red-carmen'
          } min-[425px]:top-4 md:left-1/2 md:top-16 md:w-1/3 md:-translate-x-1/2 md:text-center md:text-2xl xl:text-3xl`}
        >
          RÉSERVATION :
          <Link href={`tel:${data?.acf.tel}`} className="font-normal">
            {data?.acf.tel}
          </Link>
        </h3>
        <div
          className={`m-7 flex w-full flex-col items-center justify-center font-thunder ${
            route === '/actualites' || route === '/la-carte'
              ? 'text-cream-carmen'
              : 'text-red-carmen'
          } min-[425px]:m-0 min-[425px]:!mb-20 min-[425px]:!mt-16 min-[425px]:w-full min-[425px]:items-end min-[425px]:space-y-0 md:!m-0 md:w-1/3`}
        >
          <div className="mt-5 flex w-full items-center justify-center min-[425px]:m-0 min-[425px]:justify-end">
            <svg
              className="m-2 h-[45px] w-[45px] min-[425px]:m-1 min-[425px]:h-[35px] min-[425px]:w-[35px]"
              fill="none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.8291 0.1216C8.97555 0.107334 0.26851 8.77539 0.257822 19.6064C0.247135 30.4107 8.91321 39.1109 19.6973 39.1216C30.5205 39.1323 39.2471 30.4268 39.2578 19.6082C39.2685 8.91448 30.5169 0.135865 19.8291 0.1216ZM24.0561 19.6546H21.1419V29.6154H17.0734V19.6867H15.1335V15.6353C15.7107 15.6032 16.3146 15.5711 17.0413 15.5319C17.0413 14.9256 17.0306 14.3425 17.0449 13.7594C17.1001 11.1934 18.6142 9.67233 21.1633 9.63132C22.1947 9.61348 23.226 9.62775 24.3198 9.62775V13.096C23.7444 13.096 23.1655 13.0925 22.5848 13.0978C21.4679 13.1067 21.2915 13.2797 21.2666 14.3871C21.2577 14.7384 21.2666 15.0914 21.2666 15.5622H24.4195C24.2948 16.9709 24.1808 18.2566 24.0579 19.6546H24.0561Z"
                fill={`${
                  route === '/actualites' || route === '/la-carte'
                    ? '#fff7e7'
                    : ' #780000'
                }`}
              ></path>
            </svg>
            <svg
              className="m-2 h-[45px] w-[45px] min-[425px]:m-1 min-[425px]:h-[35px] min-[425px]:w-[35px]"
              fill="none"
              height="40"
              viewBox="0 0 40 40"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M15.5046 19.6267C15.5046 17.2798 17.3943 15.4037 19.7649 15.4019C20.1543 15.4016 20.5319 15.4551 20.8907 15.5553C22.6542 16.0462 23.9641 17.6658 23.9803 19.5812C23.9999 21.9245 22.1209 23.8381 19.7681 23.8666C19.3725 23.8715 18.9875 23.8188 18.6211 23.7164C16.8453 23.2218 15.5061 21.5598 15.5046 19.6267ZM19.7097 0.124013C30.2073 -0.0454044 39.077 8.66089 39.2551 19.3039C39.4315 29.9879 30.8628 38.9314 20.2708 39.1187C9.26021 39.313 0.440374 30.8315 0.260487 19.9067C0.08238 9.08355 8.82385 0.10618 19.7097 0.124013ZM30.5805 20.9704C30.5791 20.5295 30.5778 20.0886 30.5778 19.6481C30.5785 19.2793 30.5798 18.9106 30.5811 18.5418L30.5811 18.5402C30.583 17.9875 30.5849 17.4348 30.5849 16.8821C30.5849 16.3186 30.5831 15.755 30.576 15.1915C30.5297 11.5981 27.7815 8.81604 24.1927 8.77324C21.2539 8.73758 18.3169 8.73936 15.3782 8.76968C11.7305 8.80713 8.95209 11.5446 8.88797 15.1951C8.8381 18.1358 8.8381 21.0783 8.88797 24.0191C8.95031 27.7266 11.7163 30.4552 15.4263 30.4962C18.333 30.5283 21.2432 30.5336 24.1499 30.4926C27.7975 30.4427 30.5315 27.6642 30.5742 24.0155C30.5814 23.4413 30.5831 22.867 30.5831 22.2928C30.5831 21.8523 30.5818 21.4114 30.5805 20.9704ZM15.7718 10.5833C18.4113 10.5263 21.0544 10.5227 23.694 10.5851C23.749 10.5864 23.8037 10.5886 23.8583 10.5916C26.5657 10.7409 28.7427 13.0455 28.7759 15.7873C28.808 18.341 28.8097 20.8983 28.7777 23.4521C28.7403 26.3019 26.4712 28.5899 23.6286 28.6648C22.726 28.6895 21.8217 28.6834 20.9175 28.6774H20.9174C20.5156 28.6747 20.1137 28.6719 19.712 28.6719V28.6755C19.3309 28.6755 18.9495 28.6772 18.5681 28.6788H18.5679C17.7624 28.6823 16.9567 28.6858 16.1517 28.6737C16.0608 28.6722 15.9707 28.669 15.8813 28.664C13.0249 28.5074 10.9241 26.6188 10.7634 23.732C10.6085 20.9214 10.6388 18.0859 10.7991 15.2735C10.9469 12.6681 13.1892 10.6386 15.7718 10.5833ZM19.7477 13.4689C19.8599 13.4689 19.9715 13.472 20.0824 13.4782C23.2728 13.6559 25.8624 16.3393 25.8882 19.5821C25.915 22.9883 23.1757 25.7347 19.7436 25.7471C19.6209 25.7475 19.4992 25.7444 19.3784 25.7379C16.1533 25.5622 13.645 22.9521 13.6261 19.6696C13.6066 16.2509 16.353 13.4707 19.7477 13.4689ZM25.2725 12.1617C25.3019 12.1612 25.3312 12.1617 25.3602 12.1633C26.0473 12.2006 26.6171 12.7971 26.6274 13.5098C26.6381 14.257 26.0485 14.8616 25.2969 14.8759C25.2633 14.8764 25.2301 14.8758 25.1972 14.8741C24.4906 14.8355 23.9596 14.2755 23.9528 13.5367C23.9456 12.7645 24.5138 12.1724 25.2725 12.1617Z"
                fill="#780000"
                fillRule="evenodd"
              ></path>
            </svg>
            <svg
              className="m-2 h-[45px] w-[45px] min-[425px]:m-1 min-[425px]:h-[35px] min-[425px]:w-[35px] lg:hidden"
              fill="none"
              height="28"
              viewBox="0 0 28 28"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.6278 13.8492C27.5053 6.52007 21.4045 0.524657 14.1839 0.641323C6.69629 0.629042 0.683654 6.81112 0.806161 14.2642C0.929893 21.7874 6.99643 27.628 14.5698 27.4942C21.8553 27.3652 27.7491 21.2065 27.6278 13.8492ZM21.6629 15.9074C21.6629 16.3028 21.6617 16.6983 21.6568 17.0937C21.6274 19.6063 19.7469 21.5196 17.238 21.554C15.2387 21.5823 13.2369 21.5786 11.2376 21.5565C8.6858 21.5282 6.78327 19.6493 6.74039 17.0962C6.70609 15.0711 6.70609 13.0448 6.74039 11.0197C6.78449 8.50585 8.6956 6.62077 11.2045 6.59498C13.2259 6.5741 15.246 6.57287 17.2674 6.59744C19.7359 6.62691 21.6262 8.54269 21.658 11.0172C21.6629 11.4053 21.6642 11.7934 21.6642 12.1814C21.6642 12.8164 21.6605 13.4513 21.6605 14.0862C21.6593 14.6928 21.6629 15.3007 21.6629 15.9074Z"
                fill={`${
                  route === '/actualites' || route === '/la-carte'
                    ? '#fff7e7'
                    : ' #780000'
                }`}
              ></path>
              <rect
                fill={`${
                  route === '/actualites' || route === '/la-carte'
                    ? '#fff7e7'
                    : ' #780000'
                }`}
                height="19"
                rx="4"
                width="19"
                x="4.80432"
                y="4.63965"
              ></rect>
              <path
                d="M20.8156 10.3455L20.858 10.3218L20.8355 10.2787C20.5485 9.72882 19.9743 9.3451 19.3264 9.3451H9.28228C8.61085 9.3451 8.05999 9.72902 7.7733 10.2787L7.75085 10.3218L7.79324 10.3455L13.4891 13.5305C13.4892 13.5306 13.4893 13.5306 13.4894 13.5306C13.9928 13.8182 14.6159 13.8182 15.1195 13.5306C15.1196 13.5306 15.1196 13.5306 15.1197 13.5305L20.8156 10.3455ZM7.67925 11.7694L7.6048 11.7277L7.6048 11.813L7.60493 17.1141C7.60493 18.0485 8.34803 18.7916 9.2824 18.7916H19.3498C20.2841 18.7916 21.0272 18.0485 21.0272 17.1141V11.813V11.7277L20.9528 11.7694L15.768 14.6757L15.7679 14.6758C14.8764 15.1787 13.7557 15.1787 12.8642 14.6758L12.8641 14.6757L7.67925 11.7694ZM19.3264 20.0867H9.28228C7.63583 20.0867 6.3097 18.7605 6.3097 17.1141V11.0226C6.3097 9.37613 7.63587 8.05 9.28228 8.05H19.3264C20.9728 8.05 22.299 9.37617 22.299 11.0226V17.1141C22.299 18.7606 20.9728 20.0867 19.3264 20.0867Z"
                fill={`${
                  route === '/actualites' || route === '/la-carte'
                    ? '#780000'
                    : '#fff7e7'
                }`}
                stroke="#780000"
                strokeWidth="0.1"
              ></path>
            </svg>
          </div>
          <h3 className="text-end text-lg md:text-xl xl:text-3xl">
            {data?.acf.address}
          </h3>
          <h3 className="hidden text-end text-2xl lg:flex">
            {data?.acf.contact_mail}
          </h3>
        </div>
        <div
          className={`py-2 text-center font-thunder text-lg ${
            route === '/actualites' || route === '/la-carte'
              ? 'text-cream-carmen'
              : 'text-red-carmen'
          } min-[425px]:absolute min-[425px]:bottom-0 md:bottom-8 md:left-0 md:flex md:w-full md:items-center md:justify-center md:space-x-5 lg:text-2xl`}
        >
          <h3>MENTION LÉGALES</h3>
          <h3>WASABI ARTWORK 2023©</h3>
        </div>
      </div>
      <Image
        src={`/img/footer/footer_bg_${
          route === '/actualites' || route === '/la-carte' ? 'red' : 'white'
        }.png`}
        alt="Carmen Footer"
        width={1100}
        height={300}
        className="absolute !-top-24 -z-10 w-full"
      />
    </footer>
  );
});
