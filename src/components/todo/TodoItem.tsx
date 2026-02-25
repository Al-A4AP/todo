import { useState } from "react";
import type { TodoType, Action } from "./todoReducer";

interface Props {
  todo: TodoType;
  dispatch: React.Dispatch<Action>;
}

export default function TodoItem({ todo, dispatch }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const saveEdit = () => {
    if (!text.trim()) return;
    dispatch({ type: "edit", id: todo.id, text });
    setEditing(false);
  };

  return (
    <div className="group flex items-center gap-4 px-5 py-4 border-b border-gray-200 dark:border-gray-700">
      {/*  Toggle Button */}
      <button
        onClick={() => dispatch({ type: "toggle", id: todo.id })}
        className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer
        ${
          todo.completed
            ? "bg-gradient-to-r from-purple-400 to-blue-500 border-none"
            : "border-gray-400 dark:border-gray-500"
        }`}
      >
        {todo.completed && <span className="text-white text-xs">✓</span>}
      </button>

      {/*  Text / Edit Mode */}
      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={saveEdit}
          className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200"
          autoFocus
        />
      ) : (
        <p
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 cursor-pointer transition-colors ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-600"
              : "text-gray-800 dark:text-gray-200 hover:text-blue-500"
          }`}
        >
          {todo.text}
        </p>
      )}

      {/*  Delete Button */}
      <button
        onClick={() => dispatch({ type: "delete", id: todo.id })}
        className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-500"
      >
        ✕
      </button>
    </div>
  );
}
