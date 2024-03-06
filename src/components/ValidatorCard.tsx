import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

export const ValidatorCard = ({ data }: any) => {
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
    max-w-md flex flex-col lg:flex-row rounded overflow-hidden ${theme.shadow} 
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
};
