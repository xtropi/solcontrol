// ValidatorCard.js

export const ValidatorCard = ({ iconUrl, name, bgColor = "bg-white", textColor = "text-gray-800" }: any) => (
    <div className={`max-w-sm flex flex-col rounded overflow-hidden shadow-lg transform transition-transform ease-out duration-300 hover:scale-105 ${bgColor} ${textColor}`}>
      <div className="w-full h-32 overflow-hidden">
        <img className="w-full h-full object-cover" src={iconUrl} alt="Validator Icon" />
      </div>
      <div className="p-4 flex-grow">
        <div className={`font-bold text-xl mb-2 ${textColor}`}>{name}</div>
        <p className={`text-base ${textColor}`}>Card Description goes here.</p>
      </div>
    </div>
  );
  