import { useState } from "react";
import type { Action } from "./todoReducer";

interface Props {
  dispatch: React.Dispatch<Action>;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
}

export default function TodoInput({
  dispatch,
  searchTerm,
  setSearchTerm,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleAdd = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    dispatch({ type: "add", text: trimmed });
    setSearchTerm("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg px-5 py-4 flex items-center gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={
          isFocused ? "Currently typing..." : "Create new or Search Todo..."
        }
        className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 transition-all duration-200"
      />
      <button
        onClick={handleAdd}
        disabled={!searchTerm.trim()}
        className="w-6 h-6 rounded-full border border-gray-400 dark:border-gray-500 
                   flex items-center justify-center 
                   hover:bg-linear-to-r hover:from-purple-400 hover:to-blue-500 
                   hover:text-white 
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition"
      >
        ✓
      </button>
    </div>
  );
}
