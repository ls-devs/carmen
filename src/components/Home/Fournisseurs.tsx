import React from 'react';
import Image from 'next/image';
import { Button } from '../Button/Button';
import { block } from 'million/react';
import { useQueryUtils } from '@/hooks/useQueryUtils';
import { IFournisseurs } from '@/types/types';
import { fetchFournisseurs } from '@/utils/fetchs/fetchs';

export const Fournisseurs = /* optimize */ block(() => {
  const { data, isLoading, isFetching, isError } = useQueryUtils<
    IFournisseurs[]
  >({
    qKey: ['getFournisseurs'],
    qFn: () => fetchFournisseurs(),
  });
  return (
    <div className="relative mb-14 flex flex-col items-center justify-center">
      <div className="mb-2 mt-14">
        <h2 className="flex flex-col items-center justify-center font-thunderLC text-5xl font-bold text-red-carmen">
          <span className="font-thunder font-light">Nos</span>
          FOURNISSEURS
        </h2>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="my-4 flex w-full items-center justify-between px-2">
          <svg
            fill="none"
            height="23"
            viewBox="0 0 64 23"
            width="64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1016_162)">
              <path
                d="M38.1589 21.7646C38.2586 22.1301 38.4579 22.2298 38.757 22.0637C39.0892 21.8975 39.2553 21.4656 39.2553 20.7679C39.3882 20.2695 39.1889 19.8542 38.6573 19.5219C38.1257 19.1565 37.0625 18.7411 35.4677 18.276C33.8064 17.8108 32.6269 17.5284 31.9292 17.4287C31.2314 17.3291 30.866 17.4287 30.8327 17.7278C30.7663 17.9603 30.5171 17.977 30.0852 17.7776C29.6865 17.6115 29.4539 17.6945 29.3874 18.0268C29.3542 18.2594 29.321 18.3757 29.2878 18.3757C29.2878 18.3757 29.2213 18.2428 29.0884 17.977C29.022 17.8108 28.9721 17.6779 28.9389 17.5782C28.9057 17.4453 28.9389 17.3457 29.0386 17.2792C29.2047 17.0799 28.9057 16.8307 28.1415 16.5317C27.4105 16.2326 26.148 15.8173 24.3538 15.2857C22.028 14.6544 20.8485 14.4551 20.8153 14.6876C20.8153 14.7541 20.7821 14.7873 20.7156 14.7873C20.6824 14.7873 20.6326 14.7043 20.5661 14.5381C20.4332 14.3388 20.3335 14.2391 20.2671 14.2391C20.2339 14.2391 20.1342 14.3222 19.9681 14.4883C19.8019 14.8538 19.669 14.8372 19.5694 14.4385C19.5029 14.3056 19.2039 14.1228 18.6723 13.8902C18.1407 13.6244 17.4928 13.342 16.7286 13.043C15.9976 12.8436 15.3664 12.6277 14.8347 12.3951C14.3364 12.1625 14.0872 12.013 14.0872 11.9466C14.0872 11.8801 14.2865 11.7804 14.6852 11.6475C15.0839 11.4814 15.7318 11.2488 16.6289 10.9498C17.526 10.6508 18.7221 10.2853 20.2172 9.85337C21.7124 9.38821 23.573 8.82338 25.7991 8.15888C27.0617 7.76017 27.8923 7.46115 28.291 7.26179C28.7229 7.02922 28.9555 6.81325 28.9887 6.6139C28.9887 6.44778 28.9887 6.3481 28.9887 6.31487C29.022 6.24842 29.0718 6.29826 29.1382 6.46439C29.2711 6.69696 29.5203 6.84648 29.8858 6.91293C30.2513 6.97938 30.5503 6.91293 30.7829 6.71358C30.949 6.64713 31.3477 6.51423 31.979 6.31487C32.6103 6.0823 33.3412 5.84972 34.1719 5.61714C34.9693 5.35134 35.7002 5.11876 36.3647 4.91941C37.0625 4.68683 37.4446 4.53732 37.511 4.47087C37.7768 4.37119 38.0426 4.28813 38.3084 4.22168C38.6074 4.122 38.8899 4.03894 39.1557 3.97249C39.8202 3.80636 40.3186 3.60701 40.6508 3.37444C41.0163 3.14186 41.199 2.84283 41.199 2.47735C41.199 2.24478 41.1492 2.0122 41.0495 1.77962C40.9498 1.51382 40.8335 1.33108 40.7006 1.2314C40.5677 1.0985 40.3518 1.03205 40.0527 1.03205C39.7537 1.03205 39.3384 1.11511 38.8068 1.28124C38.3084 1.44737 37.6273 1.67994 36.7634 1.97897C35.9993 2.24477 35.2185 2.49396 34.4211 2.72654C33.6237 2.95912 32.8429 3.20831 32.0787 3.47411C31.5471 3.64024 30.866 3.8562 30.0353 4.122C29.2379 4.38781 28.507 4.60377 27.8425 4.7699C26.2809 5.20183 24.8023 5.63375 23.4069 6.06568C22.0114 6.46439 20.7821 6.84648 19.7189 7.21196C18.6557 7.54421 17.7752 7.82662 17.0775 8.0592C16.4129 8.29178 15.9976 8.4579 15.8315 8.55758C15.6654 8.72371 15.466 8.80677 15.2335 8.80677L13.4891 9.35499C11.6617 10.0527 10.748 10.9166 10.748 11.9466C10.748 12.4782 11.0138 12.9932 11.5454 13.4915C11.7448 13.6577 11.9441 13.8072 12.1435 13.9401C12.3429 14.073 12.6087 14.2225 12.9409 14.3886C13.3064 14.5215 13.7715 14.6876 14.3364 14.887C14.9012 15.0531 15.6155 15.2857 16.4794 15.5847C16.8117 15.7841 17.1771 15.9502 17.5758 16.0831C17.9745 16.1828 18.257 16.2825 18.4231 16.3821C18.6889 16.5483 18.9879 16.3821 19.3202 15.8838C19.5527 15.2193 19.6358 15.1196 19.5694 15.5847C19.5694 15.8505 19.6358 16.0831 19.7687 16.2825C19.9348 16.4486 20.2006 16.6147 20.5661 16.7808C20.9648 16.947 21.4964 17.1297 22.1609 17.3291C22.8254 17.5284 23.7059 17.7776 24.8023 18.0766C25.9652 18.4089 27.045 18.7079 28.0418 18.9737C29.0386 19.2063 29.62 19.3724 29.7861 19.4721C30.0852 19.6382 30.6168 19.8376 31.3809 20.0701C32.1451 20.3027 32.9259 20.5353 33.7233 20.7679C34.554 20.9672 35.3181 21.1334 36.0159 21.2663C36.7136 21.3992 37.1455 21.4656 37.3117 21.4656C37.5442 21.3992 37.727 21.3825 37.8599 21.4158C37.9928 21.449 38.0925 21.5653 38.1589 21.7646ZM39.1557 20.6184C39.1224 20.8177 38.9065 20.9506 38.5078 21.0171C38.1091 21.0835 37.7768 21.0005 37.511 20.7679C37.3781 20.5021 37.4113 20.2861 37.6107 20.12C37.81 19.9539 38.0925 19.904 38.4579 19.9705C38.6573 19.9705 38.8068 20.0369 38.9065 20.1698C39.0726 20.2695 39.1557 20.419 39.1557 20.6184ZM34.2715 19.0236C34.4377 19.1232 34.4875 19.1897 34.4211 19.2229C34.3546 19.2229 34.2051 19.2063 33.9725 19.1731C33.8064 19.1398 33.6735 19.1232 33.5738 19.1232C33.5074 19.09 33.5074 19.0402 33.5738 18.9737C33.7732 18.8076 34.0057 18.8242 34.2715 19.0236Z"
                fill="#780000"
              ></path>
              <path
                d="M65.7777 13.8558C65.7777 15.3177 65.7777 16.4308 65.7777 17.195C65.7777 17.9591 65.8109 18.5074 65.8774 18.8396C65.9438 19.1719 66.0601 19.3546 66.2262 19.3878C66.3923 19.4543 66.6249 19.5041 66.9239 19.5373L68.0702 19.5373L68.2197 16.8461C68.253 14.6532 68.2696 12.8092 68.2696 11.3141C68.3028 9.78572 68.3028 8.55638 68.2696 7.62607C68.2363 6.66254 68.1865 5.9482 68.1201 5.48304C68.0536 5.01789 67.9373 4.73547 67.7712 4.6358C67.5386 4.33677 67.4223 4.15403 67.4223 4.08758C67.4223 3.9879 67.4556 3.87161 67.522 3.73871C67.5885 3.60581 67.6715 3.43969 67.7712 3.24033C68.037 2.77518 68.1699 2.4097 68.1699 2.1439C68.1699 1.61229 67.7047 1.34649 66.7744 1.34649L65.678 1.34649L65.678 3.09082C65.678 3.55597 65.6946 3.97129 65.7278 4.33677C65.7943 4.66902 65.9106 4.86837 66.0767 4.93482C66.2428 5.00127 66.3259 5.05111 66.3259 5.08434C66.3259 5.08434 66.2428 5.08434 66.0767 5.08434C65.8109 5.08434 65.678 5.59933 65.678 6.62931C65.678 7.06124 65.6448 7.44333 65.5783 7.77559C65.5119 8.07461 65.4454 8.22413 65.379 8.22413C65.1796 8.22413 65.0799 8.39025 65.0799 8.72251C65.0799 9.02154 64.9637 9.20427 64.7311 9.27072C64.5317 9.30395 64.3822 9.17105 64.2825 8.87202C64.2161 8.77235 64.05 8.70589 63.7842 8.67267C63.5516 8.60622 63.1197 8.60622 62.4884 8.67267C61.8571 8.70589 60.96 8.78896 59.7971 8.92186C58.6675 9.05476 57.1723 9.2375 55.3117 9.47008C53.9495 9.60298 52.7201 9.71927 51.6237 9.81894C50.5273 9.91862 49.381 10.0017 48.1849 10.0681C47.022 10.1346 45.7262 10.201 44.2975 10.2675C42.9021 10.3339 41.2076 10.4004 39.2141 10.4668C36.988 10.5333 35.3101 10.5831 34.1804 10.6163C33.0508 10.6496 32.2534 10.6994 31.7882 10.7659C31.2898 10.8323 31.024 10.932 30.9908 11.0649C30.9576 11.1646 30.9243 11.3307 30.8911 11.5633C30.8911 12.0284 30.9908 12.4604 31.1901 12.8591C31.2898 13.0252 31.6553 13.1415 32.2866 13.2079C32.9511 13.2411 33.6488 13.2245 34.3798 13.1581C35.144 13.0916 35.8583 12.992 36.5228 12.8591C37.2205 12.6929 37.6525 12.5102 37.8186 12.3108C38.0512 12.0118 38.1675 11.8623 38.1675 11.8623C38.2007 11.8623 38.1841 12.0118 38.1176 12.3108C38.0512 12.4437 38.0346 12.56 38.0678 12.6597C38.101 12.7262 38.2837 12.776 38.616 12.8092C38.9815 12.8424 39.5131 12.8591 40.2108 12.8591C40.9418 12.8258 41.9551 12.776 43.2509 12.7095C44.0151 12.6763 44.7959 12.6431 45.5933 12.6099C46.4239 12.5434 47.2213 12.4936 47.9855 12.4604C48.7497 12.3939 49.4641 12.3441 50.1286 12.3108C50.8263 12.2444 51.4077 12.1946 51.8729 12.1613C52.3048 12.1281 52.7866 12.0949 53.3182 12.0616C53.883 11.9952 54.4479 11.9287 55.0127 11.8623C55.5775 11.7958 56.1091 11.746 56.6075 11.7128C57.1391 11.6463 57.6043 11.5965 58.003 11.5633C58.6342 11.4968 59.2489 11.4304 59.847 11.3639C60.445 11.2975 61.0597 11.1812 61.691 11.0151C62.5548 10.8157 63.3688 10.7326 64.133 10.7659L65.7777 10.7659L65.7777 13.8558Z"
                fill="#780000"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_1016_162">
                <rect
                  fill="white"
                  height="62.2974"
                  transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 63.1646 22.5122)"
                  width="22.4271"
                ></rect>
              </clipPath>
            </defs>
          </svg>

          <div>
            <Image
              src={'/img/home/fournisseurs/logo_dev_fournisseurs.png'}
              width={100}
              height={100}
              alt="NOM FOURNISSEUR"
            />
          </div>

          <svg
            fill="none"
            height="23"
            viewBox="0 0 64 23"
            width="64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1016_159)">
              <path
                d="M25.8343 21.758C25.7346 22.1235 25.5353 22.2232 25.2362 22.0571C24.904 21.8909 24.7378 21.459 24.7378 20.7613C24.6049 20.2629 24.8043 19.8476 25.3359 19.5153C25.8675 19.1499 26.9307 18.7345 28.5255 18.2694C30.1868 17.8042 31.3663 17.5218 32.064 17.4221C32.7618 17.3225 33.1272 17.4221 33.1605 17.7212C33.2269 17.9537 33.4761 17.9704 33.908 17.771C34.3067 17.6049 34.5393 17.6879 34.6058 18.0202C34.639 18.2528 34.6722 18.3691 34.7054 18.3691C34.7054 18.3691 34.7719 18.2362 34.9048 17.9704C34.9712 17.8042 35.0211 17.6713 35.0543 17.5717C35.0875 17.4388 35.0543 17.3391 34.9546 17.2726C34.7885 17.0733 35.0875 16.8241 35.8517 16.5251C36.5827 16.226 37.8452 15.8107 39.6394 15.2791C41.9652 14.6478 43.1447 14.4485 43.1779 14.6811C43.1779 14.7475 43.2111 14.7807 43.2776 14.7807C43.3108 14.7807 43.3606 14.6977 43.4271 14.5315C43.56 14.3322 43.6597 14.2325 43.7261 14.2325C43.7593 14.2325 43.859 14.3156 44.0251 14.4817C44.1913 14.8472 44.3242 14.8306 44.4238 14.4319C44.4903 14.299 44.7893 14.1162 45.3209 13.8836C45.8525 13.6178 46.5004 13.3354 47.2646 13.0364C47.9956 12.8371 48.6268 12.6211 49.1584 12.3885C49.6568 12.1559 49.906 12.0064 49.906 11.94C49.906 11.8735 49.7067 11.7738 49.308 11.6409C48.9092 11.4748 48.2614 11.2422 47.3643 10.9432C46.4672 10.6442 45.2711 10.2787 43.7759 9.84678C42.2808 9.38162 40.4202 8.81679 38.1941 8.15229C36.9315 7.75358 36.1009 7.45455 35.7022 7.2552C35.2703 7.02263 35.0377 6.80666 35.0045 6.60731C35.0045 6.44118 35.0045 6.34151 35.0045 6.30828C34.9712 6.24183 34.9214 6.29167 34.8549 6.45779C34.722 6.69037 34.4729 6.83989 34.1074 6.90634C33.7419 6.97279 33.4429 6.90634 33.2103 6.70699C33.0442 6.64054 32.6455 6.50763 32.0142 6.30828C31.3829 6.0757 30.6519 5.84313 29.8213 5.61055C29.0239 5.34475 28.293 5.11217 27.6284 4.91282C26.9307 4.68024 26.5486 4.53073 26.4822 4.46428C26.2164 4.3646 25.9506 4.28154 25.6848 4.21509C25.3857 4.11541 25.1033 4.03235 24.8375 3.9659C24.173 3.79977 23.6746 3.60042 23.3424 3.36784C22.9769 3.13527 22.7942 2.83624 22.7942 2.47076C22.7942 2.23818 22.844 2.00561 22.9437 1.77303C23.0434 1.50723 23.1596 1.32449 23.2925 1.22481C23.4254 1.09191 23.6414 1.02546 23.9404 1.02546C24.2395 1.02546 24.6548 1.10852 25.1864 1.27465C25.6848 1.44078 26.3659 1.67335 27.2297 1.97238C27.9939 2.23818 28.7747 2.48737 29.5721 2.71995C30.3695 2.95253 31.1503 3.20172 31.9145 3.46752C32.4461 3.63365 33.1272 3.84961 33.9579 4.11541C34.7553 4.38121 35.4862 4.59718 36.1507 4.76331C37.7123 5.19523 39.1909 5.62716 40.5863 6.05909C41.9818 6.4578 43.2111 6.83989 44.2743 7.20536C45.3375 7.53762 46.218 7.82003 46.9157 8.05261C47.5802 8.28519 47.9956 8.45131 48.1617 8.55099C48.3278 8.71712 48.5272 8.80018 48.7597 8.80018L50.5041 9.3484C52.3315 10.0461 53.2452 10.91 53.2452 11.94C53.2452 12.4716 52.9793 12.9866 52.4477 13.4849C52.2484 13.6511 52.049 13.8006 51.8497 13.9335C51.6503 14.0664 51.3845 14.2159 51.0523 14.382C50.6868 14.5149 50.2216 14.6811 49.6568 14.8804C49.092 15.0465 48.3776 15.2791 47.5138 15.5781C47.1815 15.7775 46.8161 15.9436 46.4174 16.0765C46.0186 16.1762 45.7362 16.2759 45.5701 16.3755C45.3043 16.5417 45.0053 16.3755 44.673 15.8772C44.4404 15.2127 44.3574 15.113 44.4238 15.5781C44.4238 15.8439 44.3574 16.0765 44.2245 16.2759C44.0584 16.442 43.7926 16.6081 43.4271 16.7743C43.0284 16.9404 42.4968 17.1231 41.8323 17.3225C41.1678 17.5218 40.2873 17.771 39.1909 18.07C38.028 18.4023 36.9481 18.7013 35.9514 18.9671C34.9546 19.1997 34.3732 19.3658 34.2071 19.4655C33.908 19.6316 33.3764 19.831 32.6122 20.0636C31.8481 20.2961 31.0673 20.5287 30.2699 20.7613C29.4392 20.9606 28.675 21.1268 27.9773 21.2597C27.2796 21.3926 26.8477 21.459 26.6815 21.459C26.4489 21.3926 26.2662 21.376 26.1333 21.4092C26.0004 21.4424 25.9007 21.5587 25.8343 21.758ZM24.8375 20.6118C24.8707 20.8111 25.0867 20.944 25.4854 21.0105C25.8841 21.0769 26.2164 20.9939 26.4822 20.7613C26.6151 20.4955 26.5819 20.2795 26.3825 20.1134C26.1831 19.9473 25.9007 19.8974 25.5353 19.9639C25.3359 19.9639 25.1864 20.0303 25.0867 20.1632C24.9206 20.2629 24.8375 20.4124 24.8375 20.6118ZM29.7216 19.017C29.5555 19.1166 29.5057 19.1831 29.5721 19.2163C29.6386 19.2163 29.7881 19.1997 30.0207 19.1665C30.1868 19.1332 30.3197 19.1166 30.4194 19.1166C30.4858 19.0834 30.4858 19.0336 30.4194 18.9671C30.22 18.801 29.9874 18.8176 29.7216 19.017Z"
                fill="#780000"
              ></path>
              <path
                d="M-1.7845 13.8492C-1.7845 15.3111 -1.7845 16.4242 -1.7845 17.1884C-1.7845 17.9525 -1.81773 18.5008 -1.88418 18.833C-1.95063 19.1653 -2.06692 19.348 -2.23304 19.3812C-2.39917 19.4477 -2.63175 19.4975 -2.93078 19.5308L-4.07705 19.5308L-4.22656 16.8395C-4.25979 14.6466 -4.2764 12.8026 -4.2764 11.3075C-4.30963 9.77913 -4.30963 8.54979 -4.2764 7.61948C-4.24318 6.65595 -4.19334 5.9416 -4.12689 5.47645C-4.06044 5.0113 -3.94415 4.72888 -3.77802 4.6292C-3.54544 4.33018 -3.42916 4.14744 -3.42916 4.08099C-3.42916 3.98131 -3.46238 3.86502 -3.52883 3.73212C-3.59528 3.59922 -3.67835 3.43309 -3.77802 3.23374C-4.04383 2.76859 -4.17673 2.40311 -4.17673 2.13731C-4.17673 1.6057 -3.71157 1.3399 -2.78126 1.3399L-1.68483 1.3399L-1.68483 3.08423C-1.68483 3.54938 -1.70144 3.9647 -1.73467 4.33018C-1.80112 4.66243 -1.91741 4.86178 -2.08353 4.92823C-2.24966 4.99468 -2.33272 5.04452 -2.33272 5.07775C-2.33272 5.07775 -2.24966 5.07775 -2.08353 5.07775C-1.81773 5.07775 -1.68483 5.59274 -1.68483 6.62272C-1.68483 7.05465 -1.6516 7.43674 -1.58515 7.76899C-1.5187 8.06802 -1.45225 8.21754 -1.3858 8.21754C-1.18645 8.21754 -1.08677 8.38366 -1.08677 8.71592C-1.08677 9.01494 -0.970484 9.19768 -0.737908 9.26413C-0.538555 9.29736 -0.389041 9.16446 -0.289367 8.86543C-0.222915 8.76575 -0.0567887 8.6993 0.209012 8.66608C0.44159 8.59963 0.873519 8.59963 1.5048 8.66608C2.13608 8.6993 3.03316 8.78237 4.19605 8.91527C5.32571 9.04817 6.82085 9.23091 8.68146 9.46348C10.0437 9.59639 11.273 9.71267 12.3695 9.81235C13.4659 9.91203 14.6122 9.99509 15.8083 10.0615C16.9712 10.128 18.267 10.1944 19.6957 10.2609C21.0911 10.3273 22.7856 10.3938 24.7791 10.4602C27.0052 10.5267 28.6831 10.5765 29.8128 10.6098C30.9424 10.643 31.7398 10.6928 32.205 10.7593C32.7034 10.8257 32.9692 10.9254 33.0024 11.0583C33.0356 11.158 33.0688 11.3241 33.1021 11.5567C33.1021 12.0218 33.0024 12.4538 32.803 12.8525C32.7034 13.0186 32.3379 13.1349 31.7066 13.2013C31.0421 13.2346 30.3444 13.2179 29.6134 13.1515C28.8492 13.085 28.1349 12.9854 27.4704 12.8525C26.7726 12.6863 26.3407 12.5036 26.1746 12.3042C25.942 12.0052 25.8257 11.8557 25.8257 11.8557C25.7925 11.8557 25.8091 12.0052 25.8756 12.3042C25.942 12.4371 25.9586 12.5534 25.9254 12.6531C25.8922 12.7196 25.7094 12.7694 25.3772 12.8026C25.0117 12.8359 24.4801 12.8525 23.7824 12.8525C23.0514 12.8192 22.038 12.7694 20.7422 12.703C19.9781 12.6697 19.1973 12.6365 18.3999 12.6033C17.5692 12.5368 16.7718 12.487 16.0076 12.4538C15.2435 12.3873 14.5291 12.3375 13.8646 12.3042C13.1669 12.2378 12.5854 12.188 12.1203 12.1547C11.6884 12.1215 11.2066 12.0883 10.675 12.0551C10.1102 11.9886 9.54532 11.9222 8.98049 11.8557C8.41566 11.7893 7.88406 11.7394 7.38568 11.7062C6.85407 11.6397 6.38892 11.5899 5.99021 11.5567C5.35893 11.4902 4.74427 11.4238 4.14621 11.3573C3.54816 11.2909 2.93349 11.1746 2.30221 11.0085C1.43835 10.8091 0.62433 10.726 -0.139852 10.7593L-1.7845 10.7593L-1.7845 13.8492Z"
                fill="#780000"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_1016_159">
                <rect
                  fill="white"
                  height="62.2974"
                  transform="translate(0.828552 22.5056) rotate(-90)"
                  width="22.4271"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="mt-2 flex items-center justify-center">
          <p className="mt-2 px-2 text-center font-thunderLC text-lg">
            Retrouvez les produits de l'Épicerie Canaille à Toulouse Bientôt
            L'Épicerie Canaille sur le web !
          </p>
        </div>
        <div className="m-4">
          <Image
            src={'/img/home/fournisseurs/fournisseurs_placeholder.png'}
            alt="FOURNISSEURS PLACEHOLDER"
            width={300}
            height={300}
          />
        </div>
        <div className="my-4">
          <Button
            color="red-carmen"
            text="DÉCOUVRIR"
            textSize="text-xl"
            width="w-[135px]"
            height="h-[70px]"
          />
        </div>
      </div>
      <Image
        src={'/img/home/videos/videos_bottom.png'}
        alt="VIDÉOS"
        width={1100}
        height={300}
        className="absolute !-top-0 w-full object-contain sm:!-top-0 lg:!-top-0"
      />
    </div>
  );
});
