import { ValidatorCard } from './ValidatorCard';

export const ValidatorsGrid = ({ data }: any) => {
  return (
    <div className="m-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {data.map((validator: any) => (
        <ValidatorCard key={validator.id} iconUrl={validator.iconUrl} name={validator.name} />
      ))}
    </div>
  );
};