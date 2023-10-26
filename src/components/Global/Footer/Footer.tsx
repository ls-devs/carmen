'use client';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IOptions } from '@/types/types';
import { cn } from '@/utils/cn';
import { fetchOptions } from '@/utils/fetchs/fetchs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Footer = ({ isAnim }: { isAnim: boolean }) => {
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
      className={cn(
        `${route === '/actualites' || route === '/la-carte'
          ? 'bg-red-carmen'
          : 'bg-cream-carmen'
        } ${isAnim ? 'opacity-0' : ''
        } flex-center relative mt-20 h-auto w-full space-y-3`
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-center p-3 min-[425px]:flex-row md:mt-12 md:items-center md:justify-between">
        <div className="flex-center relative h-full w-full min-[425px]:w-9/12 min-[575px]:w-4/6 md:w-1/3 lg:-mt-[60px]">
          <Link href={'/'} prefetch={true}>
            {data && (
              <div className="relative -mt-16 h-[100px] w-[300px]">
                <Image
                  src={`${(route === '/actualites' && data) ||
                      (route === '/la-carte' && data)
                      ? data.acf.logo_carmen_creme
                      : data?.acf.logo_carmen_red
                    }`}
                  fill
                  alt="Carmen Logo Footer"
                  className="object-contain"
                />
              </div>
            )}
          </Link>
        </div>
        <h3
          className={`absolute top-7 font-thunder text-2xl font-semibold ${route === '/actualites' || route === '/la-carte'
              ? 'text-cream-carmen'
              : 'text-red-carmen'
            } min-[425px]:top-4 md:left-1/2 md:w-1/3 md:-translate-x-1/2 md:text-center md:text-2xl xl:text-3xl md:top-[11px]`}
        >
          RÉSERVATION :
          <Link
            prefetch={true}
            href={`tel:${data?.acf.tel}`}
            className="font-normal"
          >
            {data?.acf.tel}
          </Link>
        </h3>
        <div
          className={`m-7 flex w-full flex-col items-center justify-center font-thunder ${route === '/actualites' || route === '/la-carte'
              ? 'text-cream-carmen'
              : 'text-red-carmen'
            } min-[425px]:m-0 min-[425px]:mb-20 min-[425px]:mt-16 min-[425px]:w-full min-[425px]:items-end min-[425px]:space-y-0 md:m-0 md:w-1/3 md:-mt-[100px]`}
        >
          <div className="mt-5 flex w-full items-center justify-center min-[425px]:m-0 min-[425px]:justify-end">
            {data?.acf.medias.map((rs) => {
              return (
                rs.name.toLowerCase() === 'facebook' && (
                  <Link
                    key={rs.link}
                    href={rs.link}
                    target="_blank"
                    className="m-2"
                    prefetch={true}
                  >
                    <svg
                      className="h-[45px] w-[45px] min-[425px]:h-[35px] min-[425px]:w-[35px]"
                      fill="none"
                      height="40"
                      viewBox="0 0 40 40"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.8291 0.1216C8.97555 0.107334 0.26851 8.77539 0.257822 19.6064C0.247135 30.4107 8.91321 39.1109 19.6973 39.1216C30.5205 39.1323 39.2471 30.4268 39.2578 19.6082C39.2685 8.91448 30.5169 0.135865 19.8291 0.1216ZM24.0561 19.6546H21.1419V29.6154H17.0734V19.6867H15.1335V15.6353C15.7107 15.6032 16.3146 15.5711 17.0413 15.5319C17.0413 14.9256 17.0306 14.3425 17.0449 13.7594C17.1001 11.1934 18.6142 9.67233 21.1633 9.63132C22.1947 9.61348 23.226 9.62775 24.3198 9.62775V13.096C23.7444 13.096 23.1655 13.0925 22.5848 13.0978C21.4679 13.1067 21.2915 13.2797 21.2666 14.3871C21.2577 14.7384 21.2666 15.0914 21.2666 15.5622H24.4195C24.2948 16.9709 24.1808 18.2566 24.0579 19.6546H24.0561Z"
                        fill={`${route === '/actualites' || route === '/la-carte'
                            ? '#fff7e7'
                            : ' #780000'
                          }`}
                      ></path>
                    </svg>
                  </Link>
                )
              );
            })}
            {data?.acf.medias.map((rs) => {
              return (
                rs.name.toLowerCase() === 'instagram' && (
                  <Link
                    key={rs.link}
                    href={rs.link}
                    target="_blank"
                    className="m-2"
                    prefetch={true}
                  >
                    <svg
                      className="h-[45px] w-[45px] min-[425px]:h-[35px] min-[425px]:w-[35px]"
                      fill="none"
                      height="40"
                      viewBox="0 0 40 40"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M15.5046 19.6267C15.5046 17.2798 17.3943 15.4037 19.7649 15.4019C20.1543 15.4016 20.5319 15.4551 20.8907 15.5553C22.6542 16.0462 23.9641 17.6658 23.9803 19.5812C23.9999 21.9245 22.1209 23.8381 19.7681 23.8666C19.3725 23.8715 18.9875 23.8188 18.6211 23.7164C16.8453 23.2218 15.5061 21.5598 15.5046 19.6267ZM19.7097 0.124013C30.2073 -0.0454044 39.077 8.66089 39.2551 19.3039C39.4315 29.9879 30.8628 38.9314 20.2708 39.1187C9.26021 39.313 0.440374 30.8315 0.260487 19.9067C0.08238 9.08355 8.82385 0.10618 19.7097 0.124013ZM30.5805 20.9704C30.5791 20.5295 30.5778 20.0886 30.5778 19.6481C30.5785 19.2793 30.5798 18.9106 30.5811 18.5418L30.5811 18.5402C30.583 17.9875 30.5849 17.4348 30.5849 16.8821C30.5849 16.3186 30.5831 15.755 30.576 15.1915C30.5297 11.5981 27.7815 8.81604 24.1927 8.77324C21.2539 8.73758 18.3169 8.73936 15.3782 8.76968C11.7305 8.80713 8.95209 11.5446 8.88797 15.1951C8.8381 18.1358 8.8381 21.0783 8.88797 24.0191C8.95031 27.7266 11.7163 30.4552 15.4263 30.4962C18.333 30.5283 21.2432 30.5336 24.1499 30.4926C27.7975 30.4427 30.5315 27.6642 30.5742 24.0155C30.5814 23.4413 30.5831 22.867 30.5831 22.2928C30.5831 21.8523 30.5818 21.4114 30.5805 20.9704ZM15.7718 10.5833C18.4113 10.5263 21.0544 10.5227 23.694 10.5851C23.749 10.5864 23.8037 10.5886 23.8583 10.5916C26.5657 10.7409 28.7427 13.0455 28.7759 15.7873C28.808 18.341 28.8097 20.8983 28.7777 23.4521C28.7403 26.3019 26.4712 28.5899 23.6286 28.6648C22.726 28.6895 21.8217 28.6834 20.9175 28.6774H20.9174C20.5156 28.6747 20.1137 28.6719 19.712 28.6719V28.6755C19.3309 28.6755 18.9495 28.6772 18.5681 28.6788H18.5679C17.7624 28.6823 16.9567 28.6858 16.1517 28.6737C16.0608 28.6722 15.9707 28.669 15.8813 28.664C13.0249 28.5074 10.9241 26.6188 10.7634 23.732C10.6085 20.9214 10.6388 18.0859 10.7991 15.2735C10.9469 12.6681 13.1892 10.6386 15.7718 10.5833ZM19.7477 13.4689C19.8599 13.4689 19.9715 13.472 20.0824 13.4782C23.2728 13.6559 25.8624 16.3393 25.8882 19.5821C25.915 22.9883 23.1757 25.7347 19.7436 25.7471C19.6209 25.7475 19.4992 25.7444 19.3784 25.7379C16.1533 25.5622 13.645 22.9521 13.6261 19.6696C13.6066 16.2509 16.353 13.4707 19.7477 13.4689ZM25.2725 12.1617C25.3019 12.1612 25.3312 12.1617 25.3602 12.1633C26.0473 12.2006 26.6171 12.7971 26.6274 13.5098C26.6381 14.257 26.0485 14.8616 25.2969 14.8759C25.2633 14.8764 25.2301 14.8758 25.1972 14.8741C24.4906 14.8355 23.9596 14.2755 23.9528 13.5367C23.9456 12.7645 24.5138 12.1724 25.2725 12.1617Z"
                        fillRule="evenodd"
                        fill={`${route === '/actualites' || route === '/la-carte'
                            ? '#fff7e7'
                            : ' #780000'
                          }`}
                      ></path>
                    </svg>
                  </Link>
                )
              );
            })}
            {data?.acf.medias.map((rs) => {
              return (
                rs.name.toLowerCase() === 'youtube' && (
                  <Link
                    key={rs.link}
                    href={rs.link}
                    target="_blank"
                    className="m-2"
                    prefetch={true}
                  >
                    <svg
                      data-name="calque 2"
                      className="h-[45px] w-[45px] min-[425px]:h-[35px] min-[425px]:w-[35px]"
                      id="calque_2"
                      viewBox="0 0 40.8 40.8"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g data-name="calque 1" id="calque_1-2">
                        <circle
                          fill={`${route === '/actualites' || route === '/la-carte'
                              ? '#fff7e7'
                              : '#780000'
                            }`}
                          cx="20.4"
                          cy="20.4"
                          r="20.4"
                        ></circle>
                        <g data-name="2jgwpt" id="_2jgwpt">
                          <path
                            fill={`${route === '/actualites' || route === '/la-carte'
                                ? '#780000'
                                : '#fff7e7'
                              }`}
                            d="m20.52,28.94c-.29-.01-.58-.03-.87-.04-.93-.03-1.86-.04-2.8-.07-1.03-.03-2.07-.06-3.1-.11-.8-.04-1.6-.12-2.39-.25-.6-.1-1.17-.31-1.64-.72-.42-.36-.7-.81-.84-1.34-.12-.46-.21-.94-.29-1.41-.14-.84-.22-1.69-.25-2.54-.03-.86-.03-1.73-.02-2.59,0-.77.04-1.54.08-2.3.05-.91.15-1.82.36-2.72.11-.48.28-.95.55-1.37.33-.5.79-.82,1.34-1.02.54-.19,1.09-.27,1.66-.31.62-.05,1.24-.09,1.86-.13.53-.03,1.06-.06,1.6-.07,1.56-.03,3.13-.07,4.69-.07,1.31,0,2.62.03,3.93.06,1,.02,2,.05,2.99.1.53.03,1.06.11,1.58.18.35.05.7.11,1.04.21,1.02.3,1.66.98,1.95,1.99.19.67.3,1.35.36,2.04.16,1.8.19,3.6.15,5.41-.02.9-.08,1.79-.2,2.68-.08.59-.16,1.19-.33,1.76-.13.43-.32.83-.61,1.18-.31.38-.71.63-1.17.8-.56.21-1.14.3-1.73.34-.69.05-1.38.1-2.08.13-.95.04-1.9.06-2.85.08-1,.03-1.99.06-2.99.08v.02zm-2.6-4.92c2.14-1.22,4.26-2.43,6.4-3.64-2.14-1.22-4.26-2.42-6.4-3.63v7.28z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </Link>
                )
              );
            })}
          </div>
          <h3 className="text-end text-lg md:text-xl xl:text-3xl">
            {data?.acf.address}
          </h3>
          <a
            href={`mailto:${data?.acf.contact_mail}`}
            className="hidden text-end text-2xl lg:flex"
          >
            {data?.acf.contact_mail}
          </a>
        </div>
        <div
          className={`text-center font-thunder text-lg ${route === '/actualites' || route === '/la-carte'
              ? 'text-cream-carmen'
              : 'text-red-carmen'
            } min-[425px]:absolute min-[425px]:bottom-0 md:bottom-0 md:left-0 md:flex md:w-full md:items-center md:justify-center md:space-x-5`}
        >
          <h3>MENTION LÉGALES</h3>
          <a target="_blank" href="https://wasabi-artwork.com">
            WASABI ARTWORK 2023©
          </a>
        </div>
      </div>
      <Image
        src={`/img/footer/footer_bg_${route === '/actualites' || route === '/la-carte' ? 'red' : 'white'
          }.png`}
        alt="Carmen Footer"
        width={1100}
        height={300}
        className="absolute !-top-24 -z-10 w-full"
      />
    </footer>
  );
};
