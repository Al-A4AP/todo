import type { SortType } from "./todoReducer";

interface Props {
  sort: SortType;
  setSort: (value: SortType) => void;
}

const options: SortType[] = ["newest", "oldest"];

export default function SortControls({ sort, setSort }: Props) {
  return (
    <div className="flex gap-4 font-medium">
      {options.map((s) => (
        <button
          key={s}
          onClick={() => setSort(s)}
          className={`cursor-pointer hover:text-black dark:hover:text-white transition ${
            sort === s ? "text-blue-500" : ""
          }`}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}
