import { useReducer, useMemo, useState } from "react";
import { todoReducer } from "./todoReducer";
import type { TodoType, FilterType, SortType } from "./todoReducer";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

export default function Todo() {
  const initialTodos: TodoType[] = [
    {
      id: crypto.randomUUID(),
      text: "Complete online JavaScript course",
      completed: false,
      createdAt: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      text: "Jog around the park 3x",
      completed: false,
      createdAt: Date.now() + 1,
    },
    {
      id: crypto.randomUUID(),
      text: "10 minutes meditation",
      completed: false,
      createdAt: Date.now() + 2,
    },
    {
      id: crypto.randomUUID(),
      text: "Pick up groceries",
      completed: false,
      createdAt: Date.now() + 3,
    },
    {
      id: crypto.randomUUID(),
      text: "Complete Todo App on Frontend Mentor",
      completed: false,
      createdAt: Date.now() + 4,
    },
  ];

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (filter === "active") {
      result = result.filter((t) => !t.completed);
    } else if (filter === "completed") {
      result = result.filter((t) => t.completed);
    }

    if (searchTerm.trim() !== "") {
      result = result.filter((t) =>
        t.text.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    result.sort((a, b) =>
      sort === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt,
    );

    return result;
  }, [todos, filter, sort, searchTerm]);

  const itemsLeft = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );

  return (
    <div className="space-y-6">
      <TodoInput
        dispatch={dispatch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <TodoList todos={filteredTodos} dispatch={dispatch} />

      <TodoFooter
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        itemsLeft={itemsLeft}
        dispatch={dispatch}
      />
    </div>
  );
}
