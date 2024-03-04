import { theme } from "@/app/theme";
import Image from "next/image";

export const ValidatorCard = ({ data }: any) => (
  <div
    className={`
    max-w-sm flex flex-col lg:flex-row rounded overflow-hidden shadow-xl 
    transform transition-transform ease-out duration-300 hover:scale-105 
    h-full w-full rounded-md
    ${theme.cardBackground} ${theme.cardText}
    bg-opacity-40
    `}
  >
    <div
        style={{'--image-url': `url(${data.iconUrl})`}} 
      className={`bg-cover bg-center bg-no-repeat bg-[image:var(--image-url)] min-w-32 min-h-32 overflow-hidden ${theme.cardBackground} bg-opacity-40`}
    >
      {/* <img
        className="w-full h-full object-cover"
        src={data.iconUrl}
        alt="Validator Icon"
      /> */}
    </div>
    <div className="p-4 flex-grow bg-opacity-70">
      <div className={`font-bold text-xl mb-2 ${theme.cardText}`}>
        {data.name}
      </div>
      <a
        href={data.website}
        target="_blank"
        className={`text-base ${theme.cardText}`}
      >
        {data.website}
      </a>
      <p className={`text-base ${theme.cardText}`}>{data.details}</p>
    </div>
  </div>
);
