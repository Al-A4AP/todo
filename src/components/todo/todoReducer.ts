export interface TodoType {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest";

export type Action =
  | { type: "add"; text: string }
  | { type: "delete"; id: string }
  | { type: "toggle"; id: string }
  | { type: "edit"; id: string; text: string }
  | { type: "clearCompleted" };

export function todoReducer(state: TodoType[], action: Action): TodoType[] {
  switch (action.type) {
    case "add":
      return [
        {
          id: crypto.randomUUID(),
          text: action.text.trim(),
          completed: false,
          createdAt: Date.now(),
        },
        ...state,
      ];

    case "delete":
      return state.filter((todo) => todo.id !== action.id);

    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );

    case "edit":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text.trim() } : todo,
      );

    case "clearCompleted":
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
}
