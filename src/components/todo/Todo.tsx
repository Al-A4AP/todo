import { useReducer, useMemo, useState, useEffect } from "react";
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
      createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    },
    {
      id: crypto.randomUUID(),
      text: "Jog around the park 3x",
      completed: false,
      createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    },
    {
      id: crypto.randomUUID(),
      text: "10 minutes meditation",
      completed: false,
      createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    },
    {
      id: crypto.randomUUID(),
      text: "Pick up groceries",
      completed: false,
      createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    },
    {
      id: crypto.randomUUID(),
      text: "Complete Todo App on Frontend Mentor",
      completed: false,
      createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    },
  ];

  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/todos")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // Konversi data dari backend ke format TodoType
        // Asumsi data dari backend memiliki field: id (number), text, completed, createdAt (timestamp)
        const formattedTodos: TodoType[] = data.map((item: any) => ({
          id: item.id.toString(),
          completed: item.completed,
          createdAt: item.createdAt || Date.now(), // fallback jika tidak ada
        }));
        // Dispatch action SETTODOS untuk mengganti state dengan data dari backend
        dispatch({ type: "setTodos", payload: formattedTodos });
      })
      .catch((err) => {
        console.error(
          "Gagal mengambil todos dari backend, menggunakan data default:",
          err,
        );
        // Jika gagal, tetap gunakan data default (tidak perlu dispatch)
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
