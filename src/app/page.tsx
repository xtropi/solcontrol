import { ValidatorCard } from "@/components/ValidatorCard";

const validatorsData = [
  { id: 1, iconUrl: 'https://keybase.io/lion3d/picture', name: 'Validator 1' },
  { id: 2, iconUrl: 'https://media.stakewiz.com/HxRrsnbc6K8CdEo3LCTrSUkFaDDxv9BdJsTDzBKnUVWH-.png', name: 'Validator 2' },
  { id: 3, iconUrl: 'https://raw.githubusercontent.com/diman-io/diman-io.github.io/master/diman.png', name: 'Validator 3' },
  { id: 4, iconUrl: 'https://limitless.sh/gojo.png', name: 'Validator 4' },
  { id: 5, iconUrl: 'https://stake.su/stake_su_big.jpg', name: 'Validator 5' },
  { id: 6, iconUrl: 'https://i.ibb.co/qBgQL8c/aurora.png', name: 'Validator 6' },
  { id: 7, iconUrl: '', name: 'Validator 7' },
  { id: 8, iconUrl: '', name: 'Validator 8' },
  { id: 9, iconUrl: '', name: 'Validator 9' },
  { id: 0, iconUrl: '', name: 'Validator 10' },
  { id: 11, iconUrl: '', name: 'Validator 11' },
  { id: 12, iconUrl: '', name: 'Validator 12' },
];


const colorStyles = {
  light: {
    pageBackground: "bg-gray-100",
    containerBackground: "bg-gray-200",
    cardBackground: (index: number) => (index % 2 === 0 ? "bg-white" : "bg-gray-100"),
    cardText: "text-gray-800",
    pageHeader: "bg-gray-600 text-gray-200",
    pageFooter: "bg-white rounded-lg shadow m-4 dark:bg-gray-800 text-gray-800",
  },
  dark: {
    pageBackground: "bg-gray-800",
    containerBackground: "bg-gray-700",
    cardBackground: (index: number) => (index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"),
    cardText: "text-gray-300",
    pageHeader: "bg-gray-900 text-gray-300",
    pageFooter: "bg-gray-900 text-gray-300",
  },
  vibrant: {
    pageBackground: "bg-yellow-100",
    containerBackground: "bg-yellow-200",
    cardBackground: (index: number) => (index % 2 === 0 ? "bg-yellow-300" : "bg-yellow-200"),
    cardText: "text-gray-800",
    pageHeader: "bg-yellow-400",
    pageFooter: "bg-yellow-400",
  },
};

export default function Home() {
  const colors = colorStyles.vibrant;

  return (
    <div className={`min-h-screen flex flex-col ${colors.pageBackground}`}>
      <header className={`p-4 ${colors.pageHeader}`}>
        <h1 className="text-3xl font-bold">SOL Control</h1>
      </header>
      <div className="flex-grow">
        <div className={`overflow-y-auto h-96 m-24 px-4 py-8 ${colors.containerBackground}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {validatorsData.map((validator: any, index: number) => (
              <ValidatorCard
                key={index}
                iconUrl={validator.iconUrl}
                name={validator.name}
                bgColor={colors.cardBackground(index)}
                textColor={colors.cardText}
              />
            ))}
          </div>
        </div>
      </div>
      <footer className={`rounded-lg shadow p-4 m-4 dark:bg-gray-800 ${colors.pageFooter}`}>
        <p>Made with Smart Validator Toolkit API.</p>
        <p>© 2024 Mukh.tar</p>
      </footer>
    </div>
  );
}
