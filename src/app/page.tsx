import { ValidatorCard } from "@/components/ValidatorCard";
import { validators } from "@/mocks";

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {validators.data.slice(0, 30).map((validator: any, index: number) => (
        <ValidatorCard
          key={index}
          iconUrl={validator.iconUrl}
          name={validator.name}
          website={validator.website}
          details={validator.details}
        />
      ))}
    </div>
  );
}
