import { theme, darkAccentColor } from "@/app/theme";

export const ValidatorCard = ({ iconUrl, name, website, details }: any) => (
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
      className={`min-w-32 min-h-32 overflow-hidden ${theme.cardBackground} bg-opacity-40`}
    >
      <img
        className="w-full h-full object-cover"
        src={iconUrl}
        alt="Validator Icon"
      />
    </div>
    <div className="p-4 flex-grow bg-opacity-70">
      <div className={`font-bold text-xl mb-2 ${theme.cardText}`}>{name}</div>
      <a
        href={website}
        target="_blank"
        className={`text-base ${theme.cardText}`}
      >
        {website}
      </a>
      <p className={`text-base ${theme.cardText}`}>{details}</p>
    </div>
  </div>
);
