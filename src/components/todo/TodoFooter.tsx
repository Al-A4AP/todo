import type { FilterType, SortType, Action } from "./todoReducer";
import FilterControls from "./FilterControls";

interface Props {
  filter: FilterType;
  setFilter: (v: FilterType) => void;
  sort: SortType;
  setSort: (v: SortType) => void;
  itemsLeft: number;
  dispatch: React.Dispatch<Action>;
}

export default function TodoFooter({
  filter,
  setFilter,
  sort,
  setSort,
  itemsLeft,
  dispatch,
}: Props) {
  return (
    <>
      {/* Footer Desktop */}

      <div className="hidden md:flex bg-white dark:bg-gray-800 rounded-md shadow-md px-5 py-4 justify-between items-center text-sm text-gray-400 dark:text-gray-500">
        <span>{itemsLeft} items left</span>

        <FilterControls filter={filter} setFilter={setFilter} />

        <div className="flex gap-4 font-medium">
          <button
            onClick={() => setSort("newest")}
            className={`cursor-pointer hover:text-black dark:hover:text-white transition ${
              sort === "newest" ? "text-blue-500" : ""
            }`}
          >
            Newest
          </button>

          <button
            onClick={() => setSort("oldest")}
            className={`cursor-pointer hover:text-black dark:hover:text-white transition ${
              sort === "oldest" ? "text-blue-500" : ""
            }`}
          >
            Oldest
          </button>
        </div>

        <button
          onClick={() => dispatch({ type: "clearCompleted" })}
          className="cursor-pointer hover:text-black dark:hover:text-white transition"
        >
          Clear Completed
        </button>
      </div>

      {/* Footer Mobile (items & clear) */}

      <div className="flex md:hidden bg-white dark:bg-gray-800 rounded-md shadow-md px-5 py-4 justify-between items-center text-sm text-gray-400 dark:text-gray-500">
        <span>{itemsLeft} items left</span>

        <button
          onClick={() => dispatch({ type: "clearCompleted" })}
          className="cursor-pointer hover:text-black dark:hover:text-white transition"
        >
          Clear Completed
        </button>
      </div>

      {/* Filter Mobile & Sort Card */}

      <div className="md:hidden bg-white dark:bg-gray-800 rounded-md shadow-md mt-4 py-4 px-5 flex justify-between items-center text-sm font-medium text-gray-400 dark:text-gray-500">
        {/* Left Fltr */}
        <FilterControls filter={filter} setFilter={setFilter} />

        {/* Right Sort */}
        <div className="flex gap-4">
          <button
            onClick={() => setSort("newest")}
            className={`cursor-pointer hover:text-black dark:hover:text-white transition ${
              sort === "newest" ? "text-blue-500" : ""
            }`}
          >
            Newest
          </button>

          <button
            onClick={() => setSort("oldest")}
            className={`cursor-pointer hover:text-black dark:hover:text-white transition ${
              sort === "oldest" ? "text-blue-500" : ""
            }`}
          >
            Oldest
          </button>
        </div>
      </div>
    </>
  );
}
