import { useState, KeyboardEvent } from "react";

type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

type FilterType = "all" | "active" | "completed";

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, text: "Complete online JavaScript course", completed: false },
    { id: 2, text: "Jog around the park 3x", completed: false },
    { id: 3, text: "10 minutes meditation", completed: false },
    { id: 4, text: "Read for 1 hour", completed: false },
    { id: 5, text: "Pick up groceries", completed: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
  ]);

  const [filter, setFilter] = useState<FilterType>("all");
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // Add Todo
  const addTodo = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTodo: TodoType = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  // Toggl Todo
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // Del Todo
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Clear Compt
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Start Edit
  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save Edit
  const saveEdit = () => {
    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: editingText } : todo,
        ),
      );
      setEditingId(null);
      setEditingText("");
    }
  };

  // Filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <>
      {/* Imput Card */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg px-5 py-4 mb-6 flex items-center gap-4">
        <div className="w-5 h-5 rounded-full border border-gray-400 dark:border-gray-500" />

        <input
          type="text"
          placeholder={
            isFocused ? "Currently typing..." : "Create a new todo..."
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 transition-all duration-200"
        />
      </div>

      {/* Todo List Card */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-xl overflow-hidden">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="group flex items-center gap-4 px-5 py-4 border-b border-gray-200 dark:border-gray-700"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer
              ${
                todo.completed
                  ? "bg-gradient-to-r from-purple-400 to-blue-500 border-none"
                  : "border-gray-400 dark:border-gray-500"
              }`}
            >
              {todo.completed && <span className="text-white text-xs">✓</span>}
            </button>

            {/* Text Edit */}
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit();
                }}
                className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-300"
                autoFocus
              />
            ) : (
              <p
                onDoubleClick={() => startEdit(todo.id, todo.text)}
                className={`flex-1 text-sm md:text-base cursor-pointer transition
              ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
              }`}
              >
                {todo.text}
              </p>
            )}

            {/* Delete */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 transition cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
        ))}

        {/* Footer Utama */}
        <div className="hidden md:flex justify-between items-center px-5 py-4 text-sm text-gray-400 dark:text-gray-500">
          <span>{itemsLeft} items left</span>

          <div className="flex gap-4 font-medium">
            <button
              onClick={() => setFilter("all")}
              className={`cursor-pointer hover:text-black transition ${
                filter === "all" ? "text-blue-500" : ""
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("active")}
              className={`cursor-pointer hover:text-black transition ${
                filter === "active" ? "text-blue-500" : ""
              }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`cursor-pointer hover:text-black transition ${
                filter === "completed" ? "text-blue-500" : ""
              }`}
            >
              Completed
            </button>
          </div>

          <button
            onClick={clearCompleted}
            className="cursor-pointer hover:text-black transition"
          >
            Clear Completed
          </button>
        </div>

        {/* Footer MObile*/}
        <div className="flex md:hidden justify-between items-center px-5 py-4 text-sm text-gray-400 dark:text-gray-500">
          <span>{itemsLeft} items left</span>
          <button
            onClick={clearCompleted}
            className="cursor-pointer hover:text-black transition"
          >
            Clear Completed
          </button>
        </div>
      </div>

      {/* Filter Mobile */}
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-md mt-4 py-4 flex justify-center gap-6 font-medium text-sm md:hidden">
        <button
          onClick={() => setFilter("all")}
          className={`cursor-pointer hover:text-black transition ${
            filter === "all" ? "text-blue-500" : "text-gray-400 "
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`cursor-pointer hover:text-black transition ${
            filter === "active" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`cursor-pointer hover:text-black transition ${
            filter === "completed" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          Completed
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10">
        Drag and drop to reorder list
      </p>
    </>
  );
}
