import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
  archived: boolean;
}

interface Props {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onToggleArchive: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function TodoList({
  todos,
  onToggleComplete,
  onToggleImportant,
  onToggleArchive,
  onEdit,
}: Props) {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onToggleImportant={onToggleImportant}
          onToggleArchive={onToggleArchive}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
