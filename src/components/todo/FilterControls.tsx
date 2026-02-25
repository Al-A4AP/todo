import type { FilterType } from "./todoReducer";

interface Props {
  filter: FilterType;
  setFilter: (value: FilterType) => void;
}

export default function FilterControls({ filter, setFilter }: Props) {
  const filters: FilterType[] = ["all", "active", "completed"];

  return (
    <div className="flex gap-4 font-medium">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`cursor-pointer hover:text-black transition ${
            filter === f ? "text-blue-500" : ""
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
