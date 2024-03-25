import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

export const ValidatorCard = ({ data }: any) => {
  const lamports = 1000000000;
  const [theme, setTheme] = useContext(ThemeContext);
  const iconPath = data.iconUrl
    ? data.iconUrl
    : data.keybaseUsename
    ? `https://keybase.io/${data.keybaseUsename}/picture`
    : "";
  // : "https://www.validators.app/assets/default-avatar-3068c3067ebd14b70c8d4401dda01bcc21330cff763f8aee6102b0cff44c5e88.png";

  return (
    <div
      className={`
    max-w-l flex flex-col lg:flex-row rounded overflow-hidden ${theme.shadow} 
    h-full w-full rounded-md
    ${theme.cardBackground} ${theme.cardText}
    `}
    >
      {iconPath && (
        <div
          // @ts-expect-error .
          style={{ ["--image-url"]: `url(${iconPath})` }}
          className={`bg-cover bg-center bg-no-repeat bg-[image:var(--image-url)] min-w-32 min-h-32 overflow-hidden ${theme.cardBackground} bg-opacity-40`}
        />
      )}
      {/* <img
        className="w-full h-full object-cover"
        src={data.iconUrl}
        alt="Validator Icon"
      /> */}

      <div className="p-3 flex-grow bg-opacity-70">
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
        {data.stake && <div className="mt-3">
          My stake: {Math.floor(data.stake / lamports).toString()} SOL
        </div>}
        <div className="mt-3">
          Total: {Math.floor(data.totalStake / lamports).toString()} SOL
        </div>
        <div>Fee: {data.fee}%</div>
        <div>APY: {data.apy.toPrecision(2)}%</div>
        {/* {data.details && <div className="mt-3 mb-1">Description:</div>} */}
        {/* <p className={`text-base mt-3 mb-1 ${theme.cardText}`}>
          {data.details}
        </p> */}
      </div>
    </div>
  );
};
