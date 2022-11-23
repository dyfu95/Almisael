import Image from 'next/image'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import { organization } from '../consts/config'
import useClickOutside from '../hook/useClickOutside'
import useWindowDimensions from '../hook/useWindowDimensions'
import { imageLoader } from '../loader'
import fbLogo from '../public/images/fb.png'
import lineLogo from '../public/images/line.png'

const isReadr = organization === 'readr-media'

const mmLogoSvg = (
  <svg
    width="115"
    height="48"
    viewBox="0 0 115 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.2247 0.874952C37.1152 0.874952 47.5643 11.2275 47.5643 23.999C47.5643 36.7704 37.1152 47.123 24.2247 47.123C11.3342 47.123 0.883107 36.7704 0.883107 23.999C0.883107 11.2275 11.3342 0.874952 24.2247 0.874952ZM24.2247 0C17.7548 0 11.6718 2.49637 7.09573 7.03021C2.51963 11.562 0 17.5888 0 23.999C0 30.4092 2.51963 36.4359 7.09573 40.9698C11.6718 45.5036 17.7527 48 24.2247 48C30.6967 48 36.7776 45.5036 41.3537 40.9698C45.9298 36.4359 48.4494 30.4112 48.4494 23.999C48.4494 17.5867 45.9298 11.562 41.3537 7.02817C36.7776 2.49637 30.6947 0 24.2247 0Z"
      fill="#737373"
    />
    <path
      d="M26.0545 22.0696H39.968C39.968 21.4904 39.968 20.7684 39.968 20.1402C39.968 18.8472 38.5641 18.9471 38.5641 18.9471H37.6049V15.8246H39.968V14.1155C39.968 14.1155 40.0401 12.7021 38.4509 12.7021H33.9283V11.2867H30.7767V12.7021H24.737V14.7926C24.737 14.7926 24.6897 15.8246 26.0709 15.8246H27.1002V18.9471H24.737V20.9377C24.737 20.9377 24.7144 22.0696 26.0545 22.0696ZM30.2518 15.8246H34.4533V18.9471H30.2518V15.8246Z"
      fill="#737373"
    />
    <path
      d="M36.8039 38.8364V34.5514H39.9596L39.9658 34.5453V23.1097H24.7368V32.9708C24.7368 32.9708 24.6915 34.5473 26.2437 34.5473C27.7958 34.5473 27.8781 34.5473 27.8781 34.5473V38.8364H24.8068C24.6812 40.0601 24.111 41.1533 23.2588 41.9589H24.745C24.745 41.9589 26.0007 41.9589 28.0222 41.9589C31.1676 41.9589 31.0318 38.9568 31.0318 38.9568V34.5535H33.6543V41.961H36.6701C38.6113 41.961 40.8509 38.8385 40.8509 38.8385H36.8059L36.8039 38.8364ZM32.3204 32.4405C31.3385 32.4405 30.4492 32.055 29.7946 31.4289H27.9008L27.8884 26.2322H29.7967C30.4513 25.6061 31.3406 25.2206 32.3225 25.2206C33.3044 25.2206 34.1937 25.6061 34.8483 26.2322H36.8162V31.4289H34.8483C34.1937 32.055 33.3044 32.4405 32.3225 32.4405H32.3204Z"
      fill="#737373"
    />
    <path
      d="M32.2753 26.1221C30.7541 26.1221 29.521 27.3438 29.521 28.851C29.521 30.3582 30.7541 31.5799 32.2753 31.5799C33.7966 31.5799 35.0296 30.3582 35.0296 28.851C35.0296 27.3438 33.7966 26.1221 32.2753 26.1221ZM32.2753 30.7172C31.2357 30.7172 30.3918 29.881 30.3918 28.851C30.3918 27.8211 31.2357 26.9848 32.2753 26.9848C33.3149 26.9848 34.1589 27.8211 34.1589 28.851C34.1589 29.881 33.3149 30.7172 32.2753 30.7172Z"
      fill="#737373"
    />
    <path
      d="M23.3537 40.1071C23.5616 39.7196 23.7016 39.2893 23.7654 38.8365H19.3108V28.3146H23.6872V26.422C23.6872 25.0147 22.4068 25.1942 22.4068 25.1942H19.3108V22.0717H23.7634V22.0676C23.7634 22.0676 23.7634 21.5475 23.7634 20.9112V18.8146C23.7634 18.1782 23.3928 17.2911 22.9379 16.8403L18.6438 12.5859C18.1909 12.1372 17.4478 12.1372 16.9929 12.5859L12.6865 16.8526C12.2336 17.3012 11.861 18.1905 11.861 18.8268V20.899C11.861 21.5353 11.8651 22.0594 11.8692 22.0635C11.8733 22.0676 12.248 21.7025 12.7029 21.2538L16.9929 17.0014C17.4458 16.5507 18.1889 16.5507 18.6438 17.0014L20.6097 18.9492C20.6097 18.9492 18.298 18.9492 17.104 18.9492C16.0439 18.9492 15.3749 19.7364 15.3749 19.7364L12.6617 22.4245H16.1592V25.1942H11.7848V27.144C11.7848 27.144 11.6592 28.3167 13.0117 28.3167H16.1592V38.8385H11.7848C11.7848 38.8385 12.7935 41.961 14.6482 41.961H14.8191C15.132 41.961 15.2431 41.961 15.239 41.961H20.7476C20.9267 41.961 21.0976 41.9406 21.2602 41.9039C22.0239 41.6306 22.6785 41.1269 23.1293 40.4742C23.1437 40.4538 23.1582 40.4334 23.1705 40.411C23.2137 40.3457 23.2528 40.2784 23.292 40.2111C23.3125 40.1765 23.3331 40.1418 23.3517 40.1071H23.3537Z"
      fill="#737373"
    />
    <path
      d="M19.9261 30.9987C19.1047 31.8124 19.1047 33.132 19.9261 33.9457C20.7474 34.7595 22.0793 34.7595 22.9006 33.9457C23.722 33.132 23.722 31.8124 22.9006 30.9987C22.0793 30.1849 20.7474 30.1849 19.9261 30.9987Z"
      fill="#737373"
    />
    <path
      d="M14.1108 35.4652C14.5637 35.0165 14.9363 34.1273 14.9363 33.491V30.5092C14.9363 29.8728 14.9363 29.3528 14.9321 29.3528C14.928 29.3528 14.5575 29.7199 14.1046 30.1706L12.6101 31.6513C12.1573 32.1 11.7847 32.9892 11.7847 33.6256V36.6073C11.7847 37.2437 11.7847 37.7637 11.7888 37.7637C11.7929 37.7637 12.1634 37.3966 12.6184 36.9459L14.1108 35.4672V35.4652Z"
      fill="#737373"
    />
    <path
      d="M64.998 34.0334H73.1683V35.5692H68.3226V37.1844H72.8719V38.7202H68.3226V40.5598H73.3865V42.0956H64.998V34.0334Z"
      fill="#737373"
    />
    <path
      d="M74.8893 34.0334H79.8153C83.0987 34.0334 84.5026 35.0042 84.5026 37.8045C84.5026 40.6047 83.85 42.0956 79.4777 42.0956H74.8872V34.0334H74.8893ZM78.2138 40.6965H79.1031C80.647 40.6965 81.1801 40.3457 81.1801 37.9309C81.1801 35.9669 80.9022 35.4345 79.1422 35.4345H78.2117V40.6965H78.2138Z"
      fill="#737373"
    />
    <path
      d="M86.3037 34.0334H89.6262V42.0956H86.3037V34.0334Z"
      fill="#737373"
    />
    <path
      d="M94.3567 34.0334H98.5108L102.031 42.0956H98.589L98.0744 40.5598H94.6922L94.1982 42.0956H90.7563L94.3567 34.0334ZM96.3741 35.5018H96.3349L95.1678 39.0914H97.5824L96.3761 35.5018H96.3741Z"
      fill="#737373"
    />
    <path
      d="M65.1772 23.4197H68.4997V31.4819H65.1772V23.4197Z"
      fill="#737373"
    />
    <path
      d="M70.6177 23.4198H76.1963C79.0247 23.4198 79.9943 24.413 79.9943 25.5205C79.9943 26.6952 79.1626 27.2704 77.6208 27.4845V27.5069C79.7369 27.6762 79.8563 28.4329 79.8954 29.5159C79.9551 31.1087 80.054 31.2658 80.5295 31.38V31.482H76.9497C76.6924 31.2107 76.5936 30.76 76.5936 29.8442C76.5936 28.4431 76.258 28.1494 75.2082 28.1494H73.9422V31.4799H70.6197V23.4177L70.6177 23.4198ZM73.9401 26.8176H74.9694C76.3136 26.8176 76.6697 26.2424 76.6697 25.7672C76.6697 25.1574 76.2745 24.7516 74.9488 24.7516H73.9401V26.8176Z"
      fill="#737373"
    />
    <path
      d="M81.9727 23.4198H87.5513C90.3797 23.4198 91.3492 24.413 91.3492 25.5205C91.3492 26.6952 90.5176 27.2704 88.9758 27.4845V27.5069C91.0919 27.6762 91.2113 28.4329 91.2504 29.5159C91.3101 31.1087 91.4089 31.2658 91.8845 31.38V31.482H88.3047C88.0474 31.2107 87.9486 30.76 87.9486 29.8442C87.9486 28.4431 87.613 28.1494 86.5632 28.1494H85.2972V31.4799H81.9747V23.4177L81.9727 23.4198ZM85.2951 26.8176H86.3244C87.6686 26.8176 88.0247 26.2424 88.0247 25.7672C88.0247 25.1574 87.6295 24.7516 86.3038 24.7516H85.2951V26.8176Z"
      fill="#737373"
    />
    <path
      d="M97.9759 31.641C93.6036 31.641 93.0107 30.0155 93.0107 27.4519C93.0107 24.8882 93.6036 23.2627 97.9759 23.2627C102.684 23.2627 102.941 25.2165 102.941 27.4519C102.941 29.6872 102.684 31.641 97.9759 31.641ZM97.9574 30.3765C99.3016 30.3765 99.4992 29.6647 99.4992 27.4519C99.4992 25.239 99.3016 24.5272 97.9574 24.5272C96.6132 24.5272 96.4546 25.239 96.4546 27.4519C96.4546 29.6647 96.6523 30.3765 97.9574 30.3765Z"
      fill="#737373"
    />
    <path
      d="M104.682 23.4198H110.261C113.089 23.4198 114.059 24.413 114.059 25.5205C114.059 26.6952 113.229 27.2704 111.685 27.4845V27.5069C113.804 27.6762 113.921 28.4329 113.96 29.5159C114.02 31.1087 114.119 31.2658 114.592 31.38V31.482H111.012C110.755 31.2107 110.656 30.76 110.656 29.8442C110.656 28.4431 110.321 28.1494 109.271 28.1494H108.005V31.4799H104.68V23.4177L104.682 23.4198ZM108.007 26.8176H109.036C110.38 26.8176 110.736 26.2424 110.736 25.7672C110.736 25.1574 110.341 24.7516 109.015 24.7516H108.007V26.8176Z"
      fill="#737373"
    />
    <path
      d="M52.9967 32.7771L52.1774 27.5396H52.1383V32.7771H49.1699V23.4055H54.0363L55.3661 32.7771H52.9967ZM59.2196 32.7771V27.5396H59.1805L58.4045 32.7771H56.2142L57.4987 23.4055H62.3054V32.7771H59.2196Z"
      fill="#737373"
    />
    <path
      d="M49.1699 32.7771H52.1383V42.0895H49.1699V32.7771ZM54.4521 42.0895L52.9967 32.7771H55.3661L55.7778 35.6793H55.8169L56.2142 32.7771H58.4045L57.0232 42.0895H54.4521ZM59.2196 32.7771H62.3054V42.0895H59.2196V32.7771Z"
      fill="#737373"
    />
  </svg>
)

const mmLogoMobileSvg = (
  <svg
    width="80"
    height="34"
    viewBox="0 0 80 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.912 0.61083C25.9112 0.61083 33.206 7.83828 33.206 16.7544C33.206 25.6705 25.9112 32.898 16.912 32.898C7.91277 32.898 0.616524 25.6705 0.616524 16.7544C0.616524 7.83828 7.91277 0.61083 16.912 0.61083ZM16.912 0C12.3951 0 8.14846 1.74279 4.95374 4.908C1.75903 8.07179 0 12.2793 0 16.7544C0 21.2296 1.75903 25.437 4.95374 28.6022C8.14846 31.7675 12.3937 33.5102 16.912 33.5102C21.4303 33.5102 25.6755 31.7675 28.8703 28.6022C32.065 25.437 33.824 21.231 33.824 16.7544C33.824 12.2778 32.065 8.07179 28.8703 4.90658C25.6755 1.74279 21.4289 0 16.912 0Z"
      fill="#494949"
    />
    <path
      d="M18.1904 15.4075H27.9039C27.9039 15.0031 27.9039 14.4991 27.9039 14.0606C27.9039 13.1578 26.9238 13.2276 26.9238 13.2276H26.2541V11.0477H27.9039V9.85451C27.9039 9.85451 27.9542 8.86779 26.8447 8.86779H23.6874V7.87964H21.4872V8.86779H17.2706V10.3272C17.2706 10.3272 17.2376 11.0477 18.2019 11.0477H18.9205V13.2276H17.2706V14.6173C17.2706 14.6173 17.2548 15.4075 18.1904 15.4075ZM21.1207 11.0477H24.0538V13.2276H21.1207V11.0477Z"
      fill="#494949"
    />
    <path
      d="M25.6945 27.1131V24.1216H27.8976L27.9019 24.1173V16.1338H17.2701V23.0181C17.2701 23.0181 17.2385 24.1187 18.3221 24.1187C19.4057 24.1187 19.4632 24.1187 19.4632 24.1187V27.1131H17.319C17.2313 27.9674 16.8332 28.7306 16.2383 29.293H17.2759C17.2759 29.293 18.1525 29.293 19.5638 29.293C21.7597 29.293 21.6648 27.1971 21.6648 27.1971V24.123H23.4957V29.2944H25.6011C26.9563 29.2944 28.5199 27.1145 28.5199 27.1145H25.696L25.6945 27.1131ZM22.5645 22.6479C21.879 22.6479 21.2581 22.3788 20.8011 21.9417H19.479L19.4704 18.3137H20.8026C21.2596 17.8766 21.8804 17.6075 22.5659 17.6075C23.2514 17.6075 23.8723 17.8766 24.3293 18.3137H25.7031V21.9417H24.3293C23.8723 22.3788 23.2514 22.6479 22.5659 22.6479H22.5645Z"
      fill="#494949"
    />
    <path
      d="M22.5322 18.2368C21.4702 18.2368 20.6094 19.0897 20.6094 20.1419C20.6094 21.1942 21.4702 22.047 22.5322 22.047C23.5943 22.047 24.4551 21.1942 24.4551 20.1419C24.4551 19.0897 23.5943 18.2368 22.5322 18.2368ZM22.5322 21.4448C21.8065 21.4448 21.2173 20.861 21.2173 20.1419C21.2173 19.4229 21.8065 18.8391 22.5322 18.8391C23.258 18.8391 23.8472 19.4229 23.8472 20.1419C23.8472 20.861 23.258 21.4448 22.5322 21.4448Z"
      fill="#494949"
    />
    <path
      d="M16.3043 28.0001C16.4495 27.7296 16.5472 27.4291 16.5918 27.113H13.4818V19.7674H16.5371V18.4461C16.5371 17.4636 15.6433 17.5889 15.6433 17.5889H13.4818V15.409H16.5903V15.4062C16.5903 15.4062 16.5903 15.0431 16.5903 14.5988V13.1351C16.5903 12.6909 16.3316 12.0715 16.014 11.7568L13.0162 8.78669C12.7 8.47345 12.1812 8.47345 11.8636 8.78669L8.85719 11.7654C8.54103 12.0786 8.28091 12.6994 8.28091 13.1437V14.5903C8.28091 15.0345 8.28378 15.4005 8.28666 15.4033C8.28953 15.4062 8.55109 15.1513 8.86869 14.838L11.8636 11.8693C12.1798 11.5547 12.6986 11.5547 13.0162 11.8693L14.3887 13.2291C14.3887 13.2291 12.7748 13.2291 11.9412 13.2291C11.2011 13.2291 10.7341 13.7787 10.7341 13.7787L8.83995 15.6553H11.2816V17.5889H8.22774V18.9501C8.22774 18.9501 8.14007 19.7688 9.08426 19.7688H11.2816V27.1145H8.22774C8.22774 27.1145 8.93192 29.2944 10.2268 29.2944H10.346C10.5645 29.2944 10.6421 29.2944 10.6392 29.2944H14.4849C14.61 29.2944 14.7293 29.2801 14.8428 29.2545C15.376 29.0637 15.833 28.712 16.1477 28.2564C16.1577 28.2421 16.1678 28.2279 16.1764 28.2122C16.2066 28.1667 16.2339 28.1197 16.2612 28.0727C16.2756 28.0485 16.29 28.0243 16.3029 28.0001H16.3043Z"
      fill="#494949"
    />
    <path
      d="M13.9115 21.6412C13.3381 22.2093 13.3381 23.1305 13.9115 23.6986C14.4849 24.2667 15.4147 24.2667 15.9881 23.6986C16.5615 23.1305 16.5615 22.2093 15.9881 21.6412C15.4147 21.0731 14.4849 21.0731 13.9115 21.6412Z"
      fill="#494949"
    />
    <path
      d="M9.85148 24.7595C10.1676 24.4462 10.4278 23.8254 10.4278 23.3812V21.2995C10.4278 20.8553 10.4278 20.4922 10.4249 20.4922C10.422 20.4922 10.1633 20.7485 9.84717 21.0632L8.80382 22.0969C8.48766 22.4101 8.22754 23.0309 8.22754 23.4752V25.5568C8.22754 26.0011 8.22754 26.3641 8.23041 26.3641C8.23329 26.3641 8.49197 26.1079 8.80957 25.7932L9.85148 24.7609V24.7595Z"
      fill="#494949"
    />
    <path
      d="M45.377 23.7598H51.0809V24.8319H47.6979V25.9596H50.8739V27.0318H47.6979V28.3161H51.2332V29.3882H45.377V23.7598Z"
      fill="#494949"
    />
    <path
      d="M52.2827 23.7598H55.7217C58.0139 23.7598 58.994 24.4375 58.994 26.3925C58.994 28.3474 58.5385 29.3882 55.486 29.3882H52.2812V23.7598H52.2827ZM54.6036 28.4115H55.2245C56.3023 28.4115 56.6745 28.1666 56.6745 26.4807C56.6745 25.1096 56.4805 24.7379 55.2518 24.7379H54.6022V28.4115H54.6036Z"
      fill="#494949"
    />
    <path d="M60.251 23.7598H62.5705V29.3882H60.251V23.7598Z" fill="#494949" />
    <path d="M45.502 16.3501H47.8214V21.9786H45.502V16.3501Z" fill="#494949" />
    <path
      d="M49.3008 16.3501H53.1954C55.17 16.3501 55.8469 17.0435 55.8469 17.8166C55.8469 18.6368 55.2663 19.0383 54.1899 19.1878V19.2034C55.6672 19.3216 55.7506 19.8499 55.7779 20.6059C55.8195 21.718 55.8885 21.8276 56.2205 21.9073V21.9785H53.7214C53.5417 21.7892 53.4727 21.4745 53.4727 20.8352C53.4727 19.857 53.2385 19.652 52.5056 19.652H51.6217V21.9771H49.3022V16.3486L49.3008 16.3501ZM51.6203 18.7222H52.3388C53.2773 18.7222 53.5259 18.3207 53.5259 17.9889C53.5259 17.5632 53.25 17.2798 52.3245 17.2798H51.6203V18.7222Z"
      fill="#494949"
    />
    <path
      d="M57.2266 16.3501H61.1211C63.0957 16.3501 63.7726 17.0435 63.7726 17.8166C63.7726 18.6368 63.192 19.0383 62.1156 19.1878V19.2034C63.593 19.3216 63.6763 19.8499 63.7036 20.6059C63.7453 21.718 63.8143 21.8276 64.1463 21.9073V21.9785H61.6471C61.4675 21.7892 61.3985 21.4745 61.3985 20.8352C61.3985 19.857 61.1643 19.652 60.4313 19.652H59.5475V21.9771H57.228V16.3486L57.2266 16.3501ZM59.5461 18.7222H60.2646C61.2031 18.7222 61.4517 18.3207 61.4517 17.9889C61.4517 17.5632 61.1758 17.2798 60.2503 17.2798H59.5461V18.7222Z"
      fill="#494949"
    />
    <path
      d="M68.3999 22.0896C65.3475 22.0896 64.9336 20.9548 64.9336 19.1651C64.9336 17.3753 65.3475 16.2405 68.3999 16.2405C71.6866 16.2405 71.8662 17.6045 71.8662 19.1651C71.8662 20.7256 71.6866 22.0896 68.3999 22.0896ZM68.387 21.2069C69.3254 21.2069 69.4634 20.7099 69.4634 19.1651C69.4634 17.6202 69.3254 17.1233 68.387 17.1233C67.4485 17.1233 67.3379 17.6202 67.3379 19.1651C67.3379 20.7099 67.4759 21.2069 68.387 21.2069Z"
      fill="#494949"
    />
    <path
      d="M73.0815 16.3501H76.9761C78.9507 16.3501 79.6276 17.0435 79.6276 17.8166C79.6276 18.6368 79.0484 19.0383 77.9706 19.1878V19.2034C79.4494 19.3216 79.5313 19.8499 79.5586 20.6059C79.6003 21.718 79.6693 21.8276 79.9998 21.9073V21.9785H77.5007C77.321 21.7892 77.252 21.4745 77.252 20.8352C77.252 19.857 77.0178 19.652 76.2849 19.652H75.401V21.9771H73.0801V16.3486L73.0815 16.3501ZM75.4025 18.7222H76.121C77.0595 18.7222 77.3081 18.3207 77.3081 17.9889C77.3081 17.5632 77.0321 17.2798 76.1066 17.2798H75.4025V18.7222Z"
      fill="#494949"
    />
    <path
      d="M36.9988 22.8827L36.4268 19.2262H36.3995V22.8827H34.3271V16.3401H37.7245L38.6529 22.8827H36.9988ZM41.3432 22.8827V19.2262H41.3159L40.7741 22.8827H39.245L40.1417 16.3401H43.4974V22.8827H41.3432Z"
      fill="#494949"
    />
    <path
      d="M34.3271 22.8828H36.3995V29.3841H34.3271V22.8828ZM38.0148 29.3841L36.9988 22.8828H38.6529L38.9403 24.909H38.9676L39.245 22.8828H40.7741L39.8098 29.3841H38.0148ZM41.3432 22.8828H43.4974V29.3841H41.3432V22.8828Z"
      fill="#494949"
    />
  </svg>
)

const readrLogoSvg = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.497 38.9437C27.497 39.3562 27.3799 39.7077 27.1455 39.989C26.9111 40.2702 26.5783 40.4906 26.1377 40.6406L28.1064 42.9937H26.583L24.8955 40.8702H24.5018V42.9937H23.2783V37.1718H25.0174C25.3502 37.1671 25.6877 37.2046 26.0111 37.2796C26.2877 37.3406 26.5549 37.4531 26.7939 37.6124C27.0049 37.7531 27.183 37.9453 27.3049 38.1656C27.4361 38.4046 27.5017 38.6765 27.497 38.9437ZM26.2689 38.9718C26.2689 38.6765 26.1517 38.4609 25.9174 38.3249C25.683 38.189 25.383 38.1234 25.008 38.1234H24.5018V39.9421H24.8674C25.2892 39.9421 25.6267 39.8624 25.8799 39.6984C26.1424 39.5343 26.2689 39.2906 26.2689 38.9718Z"
      fill="#737373"
    />
    <path
      d="M28.7207 37.1719H32.2176V38.1422H29.9441V39.5484H32.1098V40.5188H29.9441V42.0234H32.2457V42.9938H28.7207V37.1719V37.1719Z"
      fill="#737373"
    />
    <path
      d="M38.6156 42.9938H37.3453L36.9328 41.7703H34.5375L34.125 42.9938H32.8594L35.0766 37.1719H36.4031L38.6156 42.9938ZM35.7422 38.1516L34.8656 40.8H36.6141L35.7422 38.1516Z"
      fill="#737373"
    />
    <path
      d="M39.3936 37.172H41.1514C41.6248 37.1674 42.0983 37.2377 42.5483 37.3924C42.942 37.5236 43.3029 37.7299 43.617 38.0017C43.9076 38.2549 44.142 38.5689 44.2967 38.9205C44.6155 39.6611 44.6155 40.5049 44.2967 41.2455C44.1373 41.597 43.9076 41.9111 43.617 42.1689C43.3029 42.4408 42.942 42.647 42.5483 42.7783C42.0983 42.9283 41.6295 43.0033 41.1514 42.9986H39.3936V37.172ZM41.1795 42.0236C41.4701 42.0283 41.7608 41.9814 42.0373 41.8924C42.2858 41.8127 42.5154 41.6814 42.717 41.508C42.9092 41.3392 43.0592 41.133 43.1576 40.8986C43.3686 40.3736 43.3686 39.7877 43.1576 39.2674C43.0592 39.033 42.9045 38.8267 42.717 38.658C42.5201 38.4845 42.2904 38.358 42.0373 38.2736C41.7608 38.1845 41.4701 38.1377 41.1795 38.1424H40.6217V42.0236H41.1795Z"
      fill="#737373"
    />
    <path
      d="M48.0002 39.7595H47.7986C47.5033 39.7595 47.2549 39.8064 47.0533 39.9001C46.8611 39.9892 46.6971 40.1251 46.5799 40.3032V42.9986H45.3799V38.7376H46.533V39.4876C46.5986 39.2579 46.7346 39.0517 46.9221 38.9017C47.1002 38.7611 47.3393 38.6907 47.6346 38.6907C47.7564 38.6907 47.8783 38.7048 47.9955 38.7329L48.0002 39.7595Z"
      fill="#737373"
    />
    <path
      d="M5.27832 9.29072V6.86259H14.6158V9.29072H5.27832ZM5.97207 13.3313V11.1376H13.9268V13.3313H5.97207ZM5.97207 17.4892V15.2954H13.9268V17.4892H5.97207ZM6.54863 5.01572V2.82197H13.4674V5.01572H6.54863ZM14.9627 29.6204L14.5033 28.697C14.3486 28.2329 14.1939 27.886 14.0439 27.6563C16.4252 27.1173 18.8861 26.5782 21.4221 26.0392L22.3455 27.6563C19.9268 28.4579 17.4611 29.1142 14.9627 29.6204ZM14.733 5.47978V3.62822H22.2283V1.89384H25.1111V3.62822H32.8361V5.47509H25.1111V6.86259H31.683V8.47978H15.6564V6.86259H22.2283V5.47509L14.733 5.47978ZM15.0799 14.372V9.75009H32.2596V14.372H15.0799ZM15.8861 25.8095V15.6423H31.4533V25.8095H15.8861ZM17.5033 11.1376V12.872H20.1564V11.1376H17.5033V11.1376ZM18.5393 17.2595V18.647H28.8002V17.2595H18.5393ZM18.5393 20.0345V21.3048H28.8002V20.0345H18.5393ZM18.5393 22.8048V24.0751H28.8002V22.8048H18.5393ZM22.2283 11.1376V12.872H25.1111V11.1376H22.2283V11.1376ZM32.4893 29.6204C30.4877 29.236 27.9143 28.5423 24.7643 27.5392L25.6877 25.8048C28.2236 26.4188 30.7596 27.0001 33.2955 27.5392L32.4893 29.6204ZM29.9533 11.1376H27.0705V12.872H29.9533V11.1376Z"
      fill="#737373"
    />
    <path
      d="M6.08887 19.4531V29.1562H13.8139V19.4531H6.08887ZM11.6201 27.0563H8.39043V21.7641H11.6201V27.0563Z"
      fill="#737373"
    />
    <path
      d="M21.8391 32.1375L11.0391 39.5766V32.1375H2.87813V1.89844H0V35.0156H7.92188V46.0547L23.5219 35.0156H48V32.1375H21.8391Z"
      fill="#737373"
    />
    <path
      d="M47.9997 7.17656H42.7215V1.89844H39.8387V7.17656H34.5605V10.0547H39.8387V15.3375H42.7215V10.0547H47.9997V7.17656Z"
      fill="#737373"
    />
  </svg>
)

const readrLogoMobileSvg = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1117_21335)">
      <path
        d="M16.04 22.7172C16.04 22.9578 15.9717 23.1629 15.8349 23.3269C15.6982 23.491 15.5041 23.6195 15.2471 23.707L16.3955 25.0797H15.5068L14.5225 23.841H14.2928V25.0797H13.5791V21.6836H14.5935C14.7877 21.6808 14.9846 21.7027 15.1732 21.7465C15.3346 21.782 15.4904 21.8476 15.6299 21.9406C15.7529 22.0226 15.8568 22.1347 15.9279 22.2633C16.0045 22.4027 16.0428 22.5613 16.04 22.7172ZM15.3236 22.7336C15.3236 22.5613 15.2553 22.4355 15.1185 22.3562C14.9818 22.2769 14.8068 22.2387 14.5881 22.2387H14.2928V23.2996H14.506C14.7521 23.2996 14.949 23.2531 15.0967 23.1574C15.2498 23.0617 15.3236 22.9195 15.3236 22.7336Z"
        fill="black"
      />
      <path
        d="M16.7539 21.6836H18.7937V22.2496H17.4676V23.0699H18.7309V23.6359H17.4676V24.5137H18.8102V25.0797H16.7539V21.6836Z"
        fill="black"
      />
      <path
        d="M22.5258 25.0797H21.7848L21.5441 24.366H20.1469L19.9062 25.0797H19.168L20.4613 21.6836H21.2352L22.5258 25.0797ZM20.8496 22.2551L20.3383 23.8H21.3582L20.8496 22.2551Z"
        fill="black"
      />
      <path
        d="M22.9795 21.6837H24.0049C24.2811 21.681 24.5572 21.722 24.8197 21.8122C25.0494 21.8888 25.26 22.0091 25.4432 22.1677C25.6127 22.3154 25.7494 22.4986 25.8397 22.7036C26.0256 23.1357 26.0256 23.6279 25.8397 24.0599C25.7467 24.265 25.6127 24.4482 25.4432 24.5986C25.26 24.7572 25.0494 24.8775 24.8197 24.954C24.5572 25.0415 24.2838 25.0853 24.0049 25.0825H22.9795V21.6837ZM24.0213 24.5138C24.1908 24.5165 24.3604 24.4892 24.5217 24.4372C24.6666 24.3908 24.8006 24.3142 24.9182 24.213C25.0303 24.1146 25.1178 23.9943 25.1752 23.8575C25.2983 23.5513 25.2983 23.2095 25.1752 22.906C25.1178 22.7693 25.0275 22.649 24.9182 22.5505C24.8033 22.4493 24.6693 22.3755 24.5217 22.3263C24.3604 22.2743 24.1908 22.247 24.0213 22.2497H23.6959V24.5138H24.0213Z"
        fill="black"
      />
      <path
        d="M28.0002 23.193H27.8826C27.7104 23.193 27.5654 23.2204 27.4479 23.275C27.3357 23.327 27.24 23.4063 27.1717 23.5102V25.0825H26.4717V22.5969H27.1443V23.0344C27.1826 22.9004 27.2619 22.7801 27.3713 22.6926C27.4752 22.6106 27.6147 22.5696 27.7869 22.5696C27.858 22.5696 27.9291 22.5778 27.9975 22.5942L28.0002 23.193Z"
        fill="black"
      />
      <path
        d="M3.0791 5.41958V4.00317H8.52598V5.41958H3.0791ZM3.48379 7.77661V6.49692H8.12402V7.77661H3.48379ZM3.48379 10.202V8.92231H8.12402V10.202H3.48379ZM3.82012 2.92583V1.64614H7.85605V2.92583H3.82012ZM8.72832 17.2786L8.46035 16.7399C8.37012 16.4692 8.27988 16.2668 8.19238 16.1329C9.58145 15.8184 11.017 15.504 12.4963 15.1895L13.035 16.1329C11.624 16.6004 10.1857 16.9833 8.72832 17.2786ZM8.59434 3.19653V2.11646H12.9666V1.10474H14.6482V2.11646H19.1545V3.1938H14.6482V4.00317H18.4818V4.94653H9.13301V4.00317H12.9666V3.1938L8.59434 3.19653ZM8.79668 8.38364V5.68755H18.8182V8.38364H8.79668ZM9.26699 15.0555V9.12466H18.3479V15.0555H9.26699ZM10.2104 6.49692V7.50864H11.758V6.49692H10.2104ZM10.8146 10.068V10.8774H16.8002V10.068H10.8146ZM10.8146 11.6868V12.4278H16.8002V11.6868H10.8146ZM10.8146 13.3028V14.0438H16.8002V13.3028H10.8146ZM12.9666 6.49692V7.50864H14.6482V6.49692H12.9666ZM18.9521 17.2786C17.7846 17.0543 16.2834 16.6497 14.4459 16.0645L14.9846 15.0528C16.4639 15.411 17.9432 15.75 19.4225 16.0645L18.9521 17.2786ZM17.4729 6.49692H15.7912V7.50864H17.4729V6.49692Z"
        fill="black"
      />
      <path
        d="M3.55176 11.3477V17.0078H8.05801V11.3477H3.55176ZM6.77832 15.7828H4.89434V12.6957H6.77832V15.7828Z"
        fill="black"
      />
      <path
        d="M12.7395 18.7469L6.43945 23.0863V18.7469H1.67891V1.10742H0V20.4258H4.62109V26.8652L13.7211 20.4258H28V18.7469H12.7395Z"
        fill="black"
      />
      <path
        d="M27.9996 4.18633H24.9207V1.10742H23.2391V4.18633H20.1602V5.86523H23.2391V8.94688H24.9207V5.86523H27.9996V4.18633Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1117_21335">
        <rect width="28" height="28" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const shareIconSvg = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.381 12.2381C34.932 12.2381 37 10.1701 37 7.61905C37 5.06802 34.932 3 32.381 3C29.8299 3 27.7619 5.06802 27.7619 7.61905C27.7619 10.1701 29.8299 12.2381 32.381 12.2381ZM32.381 15.2381C36.5888 15.2381 40 11.8269 40 7.61905C40 3.41116 36.5888 0 32.381 0C28.1731 0 24.7619 3.41116 24.7619 7.61905C24.7619 8.46146 24.8986 9.27194 25.1511 10.0295L14.0038 15.8409C12.6441 13.7577 10.2923 12.381 7.61905 12.381C3.41116 12.381 0 15.7921 0 20C0 24.2079 3.41116 27.619 7.61905 27.619C10.4179 27.619 12.8642 26.1099 14.1888 23.861L25.0919 30.156C24.8773 30.8598 24.7619 31.6069 24.7619 32.381C24.7619 36.5888 28.1731 40 32.381 40C36.5888 40 40 36.5888 40 32.381C40 28.1731 36.5888 24.7619 32.381 24.7619C29.9711 24.7619 27.8225 25.8807 26.4264 27.6273L15.1563 21.1205C15.2102 20.7548 15.2381 20.3807 15.2381 20C15.2381 19.4854 15.1871 18.9828 15.0899 18.4968L26.5494 12.5226C27.947 14.183 30.0408 15.2381 32.381 15.2381ZM32.381 37C34.932 37 37 34.932 37 32.381C37 29.8299 34.932 27.7619 32.381 27.7619C29.8299 27.7619 27.7619 29.8299 27.7619 32.381C27.7619 34.932 29.8299 37 32.381 37ZM12.2381 20C12.2381 22.551 10.1701 24.619 7.61905 24.619C5.06802 24.619 3 22.551 3 20C3 17.449 5.06802 15.381 7.61905 15.381C10.1701 15.381 12.2381 17.449 12.2381 20Z"
      fill="#737373"
    />
  </svg>
)
const shareIconMobileSvg = isReadr ? (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="12" fill="black" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2446 7.36731C16.0305 7.36731 15.8569 7.54092 15.8569 7.75507C15.8569 7.96922 16.0305 8.14282 16.2446 8.14282C16.4588 8.14282 16.6324 7.96922 16.6324 7.75507C16.6324 7.54092 16.4588 7.36731 16.2446 7.36731ZM16.2446 10.3673C17.6873 10.3673 18.8569 9.19777 18.8569 7.75507C18.8569 6.31236 17.6873 5.14282 16.2446 5.14282C14.8019 5.14282 13.6324 6.31236 13.6324 7.75507C13.6324 8.04389 13.6792 8.32177 13.7658 8.58151L9.94389 10.574C9.47768 9.85976 8.67138 9.38772 7.75482 9.38772C6.31212 9.38772 5.14258 10.5573 5.14258 12C5.14258 13.4427 6.31212 14.6122 7.75482 14.6122C8.71442 14.6122 9.55317 14.0948 10.0073 13.3237L13.7455 15.482C13.672 15.7233 13.6324 15.9795 13.6324 16.2449C13.6324 17.6876 14.8019 18.8571 16.2446 18.8571C17.6873 18.8571 18.8569 17.6876 18.8569 16.2449C18.8569 14.8022 17.6873 13.6326 16.2446 13.6326C15.4184 13.6326 14.6817 14.0162 14.2031 14.615L10.339 12.3841C10.3575 12.2587 10.3671 12.1305 10.3671 12C10.3671 11.8235 10.3496 11.6512 10.3162 11.4846L14.2452 9.4363C14.7244 10.0056 15.4423 10.3673 16.2446 10.3673ZM16.2446 15.8571C16.0305 15.8571 15.8569 16.0307 15.8569 16.2449C15.8569 16.459 16.0305 16.6326 16.2446 16.6326C16.4588 16.6326 16.6324 16.459 16.6324 16.2449C16.6324 16.0307 16.4588 15.8571 16.2446 15.8571ZM7.36707 12C7.36707 11.7858 7.54067 11.6122 7.75482 11.6122C7.96897 11.6122 8.14258 11.7858 8.14258 12C8.14258 12.2141 7.96897 12.3877 7.75482 12.3877C7.54067 12.3877 7.36707 12.2141 7.36707 12Z"
      fill="white"
    />
  </svg>
) : (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="14" fill="black" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.999 9.06039C18.9993 9.05878 19 9.05485 19 9.04762C19 9.04039 18.9993 9.03645 18.999 9.03484C18.9986 9.03306 18.9982 9.03158 18.9975 9.03C18.996 9.02648 18.9925 9.02044 18.9861 9.01395C18.9796 9.00746 18.9735 9.004 18.97 9.00251C18.9684 9.00185 18.9669 9.00138 18.9652 9.00101C18.9635 9.00068 18.9596 9 18.9524 9C18.9452 9 18.9412 9.00068 18.9396 9.00101C18.9378 9.00138 18.9363 9.00185 18.9348 9.00251C18.9312 9.004 18.9252 9.00746 18.9187 9.01395C18.9122 9.02044 18.9088 9.02648 18.9073 9.03C18.9066 9.03158 18.9061 9.03306 18.9058 9.03484C18.9054 9.03645 18.9048 9.04039 18.9048 9.04762C18.9048 9.05485 18.9054 9.05878 18.9058 9.06039C18.9061 9.06218 18.9066 9.06366 18.9073 9.06523C18.9088 9.06876 18.9122 9.0748 18.9187 9.08129C18.9252 9.08778 18.9312 9.09124 18.9348 9.09273C18.9363 9.09339 18.9378 9.09386 18.9396 9.09423C18.9412 9.09455 18.9452 9.09524 18.9524 9.09524C18.9596 9.09524 18.9635 9.09455 18.9652 9.09423C18.9669 9.09386 18.9684 9.09339 18.97 9.09273C18.9735 9.09124 18.9796 9.08778 18.9861 9.08129C18.9925 9.0748 18.996 9.06876 18.9975 9.06523C18.9982 9.06366 18.9986 9.06218 18.999 9.06039ZM18.9524 12.0952C20.6355 12.0952 22 10.7308 22 9.04762C22 7.36447 20.6355 6 18.9524 6C17.2692 6 15.9048 7.36447 15.9048 9.04762C15.9048 9.38458 15.9594 9.70877 16.0604 10.0118L11.6015 12.3364C11.0576 11.5031 10.1169 10.9524 9.04762 10.9524C7.36447 10.9524 6 12.3168 6 14C6 15.6832 7.36447 17.0476 9.04762 17.0476C10.1671 17.0476 11.1457 16.444 11.6755 15.5444L16.0368 18.0624C15.9509 18.3439 15.9048 18.6428 15.9048 18.9524C15.9048 20.6355 17.2692 22 18.9524 22C20.6355 22 22 20.6355 22 18.9524C22 17.2692 20.6355 15.9048 18.9524 15.9048C17.9884 15.9048 17.129 16.3523 16.5706 17.0509L12.0625 14.4482C12.0841 14.3019 12.0952 14.1523 12.0952 14C12.0952 13.7942 12.0748 13.5931 12.0359 13.3987L16.6197 11.0091C17.1788 11.6732 18.0163 12.0952 18.9524 12.0952ZM18.999 18.9652C18.9993 18.9635 19 18.9596 19 18.9524C19 18.9452 18.9993 18.9412 18.999 18.9396L18.9981 18.9365L18.9975 18.9348C18.996 18.9312 18.9925 18.9252 18.9861 18.9187C18.9796 18.9122 18.9735 18.9088 18.97 18.9073C18.9684 18.9066 18.9669 18.9061 18.9652 18.9058C18.964 18.9055 18.9618 18.9051 18.9581 18.9049L18.9524 18.9048C18.9452 18.9048 18.9412 18.9054 18.9396 18.9058C18.9378 18.9061 18.9363 18.9066 18.9348 18.9073C18.9312 18.9088 18.9252 18.9122 18.9187 18.9187C18.9122 18.9252 18.9088 18.9312 18.9073 18.9348C18.9066 18.9363 18.9061 18.9378 18.9058 18.9396C18.9054 18.9412 18.9048 18.9452 18.9048 18.9524L18.9049 18.9581C18.9051 18.9618 18.9055 18.964 18.9058 18.9652C18.9061 18.9669 18.9066 18.9684 18.9073 18.97C18.9088 18.9735 18.9122 18.9796 18.9187 18.9861C18.9252 18.9925 18.9312 18.996 18.9348 18.9975L18.9365 18.9981L18.9396 18.999C18.9412 18.9993 18.9452 19 18.9524 19C18.9596 19 18.9635 18.9993 18.9652 18.999C18.9669 18.9986 18.9684 18.9982 18.97 18.9975C18.9735 18.996 18.9796 18.9925 18.9861 18.9861C18.9925 18.9796 18.996 18.9735 18.9975 18.97C18.9982 18.9684 18.9986 18.9669 18.999 18.9652ZM9.09524 14C9.09524 14.0072 9.09455 14.0112 9.09423 14.0128L9.09344 14.0157L9.09273 14.0176C9.09124 14.0211 9.08778 14.0272 9.08129 14.0337C9.0748 14.0402 9.06876 14.0436 9.06523 14.0451C9.06366 14.0458 9.06218 14.0462 9.06039 14.0466C9.05878 14.0469 9.05485 14.0476 9.04762 14.0476C9.04039 14.0476 9.03645 14.0469 9.03484 14.0466C9.03306 14.0462 9.03158 14.0458 9.03 14.0451C9.02648 14.0436 9.02044 14.0402 9.01395 14.0337C9.00746 14.0272 9.004 14.0211 9.00251 14.0176L9.00146 14.0146L9.00101 14.0128C9.00068 14.0112 9 14.0072 9 14C9 13.9928 9.00068 13.9888 9.00101 13.9872C9.00138 13.9854 9.00185 13.984 9.00251 13.9824C9.004 13.9789 9.00746 13.9728 9.01395 13.9663C9.02044 13.9598 9.02648 13.9564 9.03 13.9549L9.0326 13.954L9.03484 13.9534C9.03645 13.9531 9.04039 13.9524 9.04762 13.9524C9.05485 13.9524 9.05878 13.9531 9.06039 13.9534L9.06276 13.954L9.06523 13.9549C9.06876 13.9564 9.0748 13.9598 9.08129 13.9663C9.08778 13.9728 9.09124 13.9789 9.09273 13.9824L9.09371 13.9851L9.09423 13.9872C9.09455 13.9888 9.09524 13.9928 9.09524 14Z"
      fill="white"
    />
  </svg>
)

const Nav = styled.nav`
  position: fixed;
  z-index: 200;
  display: flex;
  padding: 8px 8px 0 8px;
  top: 0;
  width: 100vw;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;

  * {
    pointer-events: auto;
  }

  a {
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    width: unset;
    > div {
      margin-top: 8px;
    }
  }
  ${({ dashboardInView }) =>
    !dashboardInView &&
    `
      top: 40px;
      @media (max-width: 1024px) {
        display: none;
      }
  `}
  ${({ isReadr }) => !isReadr && 'align-items: start;'}
`

const LinkButton = styled.a`
  display: flex;
`

const ShareWrapper = styled.div`
  position: relative;
  ${({ isReadr }) => !isReadr && 'margin-left: 4px;'}
`

const StyledImage = styled(Image)`
  position: absolute;
  top: 30px;
  left: 0;
  cursor: pointer;
  width: 40px;
  height: 40px;

  @media (max-width: 1024px) {
    width: 24px;
    height: 24px;
  }

  ${({ show, isReadr }) =>
    show
      ? `
      transition-duration: 190ms;
      &:first-of-type {
        transform: translate3d(0, 20px, 0);  
      }
      &:last-of-type {
        transform: translate3d(0, 70px, 0);  
      }
      @media (max-width: 1024px) {
        &:first-of-type {
          transform: translate3d(0, 5px, 0);  
        }
        &:last-of-type {
          transform: translate3d(0, 40px, 0);  
        }  
      }
      ${
        !isReadr &&
        `
        @media (max-width: 1024px) {
          width: 28px;
          height: 28px;
        }

    `
      }

    `
      : `
      visibility: hidden;
    `}
`

export const NavBar = ({ dashboardInView }) => {
  const [showShareIcon, setShowShareIcon] = useState()
  const shareIconRef = useRef(null)
  const { width } = useWindowDimensions()
  const isMobile = width <= 1024
  useClickOutside(shareIconRef, () => {
    setShowShareIcon()
  })

  const onShareFB = (e) => {
    e.stopPropagation()
    window.open(
      'https://www.facebook.com/share.php?u='.concat(
        encodeURIComponent(
          window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname
        )
      )
    )
  }

  const onShareLine = (e) => {
    e.stopPropagation()
    window.open(
      'https://line.me/R/msg/text/?' +
        encodeURIComponent(document.title) +
        ' '.concat(
          encodeURIComponent(
            window.location.protocol +
              '//' +
              window.location.host +
              window.location.pathname
          )
        )
    )
  }

  const Logo = isReadr
    ? isMobile
      ? readrLogoMobileSvg
      : readrLogoSvg
    : isMobile
    ? mmLogoMobileSvg
    : mmLogoSvg

  return (
    <Nav dashboardInView={dashboardInView}>
      <LinkButton href="https://www.readr.tw/" target="_blank" rel="noreferrer">
        {Logo}
      </LinkButton>
      <ShareWrapper ref={shareIconRef} isReadr={isReadr}>
        <LinkButton
          onClick={() => {
            setShowShareIcon((value) => (value ? undefined : 'show'))
          }}
        >
          {isMobile ? shareIconMobileSvg : shareIconSvg}
        </LinkButton>
        <StyledImage
          show={showShareIcon}
          src={fbLogo}
          loader={imageLoader}
          alt="facebook logo"
          onClick={onShareFB}
          isReadr={isReadr}
        />
        <StyledImage
          show={showShareIcon}
          src={lineLogo}
          loader={imageLoader}
          alt="line logo"
          onClick={onShareLine}
          isReadr={isReadr}
        />
      </ShareWrapper>
    </Nav>
  )
}
