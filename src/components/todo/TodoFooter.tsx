import type { FilterType, SortType, Action } from "./todoReducer";
import FilterControls from "./FilterControls";
import SortControls from "./SortControls";

interface Props {
  filter: FilterType;
  setFilter: (v: FilterType) => void;
  sort: SortType;
  setSort: (v: SortType) => void;
  itemsLeft: number;
  dispatch: React.Dispatch<Action>;
}

function ItemsLeft({ count }: { count: number }) {
  return <span>{count} items left</span>;
}

function ClearCompleted({ dispatch }: { dispatch: React.Dispatch<Action> }) {
  return (
    <button
      onClick={() => dispatch({ type: "clearCompleted" })}
      className="cursor-pointer hover:text-black dark:hover:text-white transition"
    >
      Clear Completed
    </button>
  );
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
      {/* Desktp: single row */}
      <div className="hidden md:flex bg-white dark:bg-gray-800 rounded-md shadow-md px-5 py-4 justify-between items-center text-sm text-gray-400 dark:text-gray-500">
        <ItemsLeft count={itemsLeft} />
        <FilterControls filter={filter} setFilter={setFilter} />
        <SortControls sort={sort} setSort={setSort} />
        <ClearCompleted dispatch={dispatch} />
      </div>

      {/* Mobile: items left & clear completed */}
      <div className="flex md:hidden bg-white dark:bg-gray-800 rounded-md shadow-md px-5 py-4 justify-between items-center text-sm text-gray-400 dark:text-gray-500">
        <ItemsLeft count={itemsLeft} />
        <ClearCompleted dispatch={dispatch} />
      </div>

      {/* Mobile: filter & sort */}
      <div className="md:hidden bg-white dark:bg-gray-800 rounded-md shadow-md mt-4 py-4 px-5 flex justify-between items-center text-sm font-medium text-gray-400 dark:text-gray-500">
        <FilterControls filter={filter} setFilter={setFilter} />
        <SortControls sort={sort} setSort={setSort} />
      </div>
    </>
  );
}
