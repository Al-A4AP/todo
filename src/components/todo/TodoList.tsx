import type { TodoType, Action } from "./todoReducer";
import TodoItem from "./TodoItem";

interface Props {
  todos: TodoType[];
  dispatch: React.Dispatch<Action>;
}

export default function TodoList({ todos, dispatch }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-xl overflow-hidden">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </div>
  );
}
