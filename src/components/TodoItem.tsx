import { Checkbox } from "./ui/Checkbox";
import { Button } from "./ui/Button";
import { Star, Archive, Edit2 } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
  archived: boolean;
}

interface Props {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onToggleArchive: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function TodoItem({ todo, onToggleComplete, onToggleImportant, onToggleArchive, onEdit }: Props) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl shadow-md ${todo.archived ? "opacity-50" : "bg-white"}`}>
  <div className="flex items-center gap-3 flex-1 min-w-0">
    <Checkbox checked={todo.completed} onCheckedChange={() => onToggleComplete(todo.id)} />
    <span
      className={`text-lg ${todo.completed ? "line-through text-gray-500" : ""} `}
      title={todo.text}
    >
      {todo.text}
    </span>
  </div>
  <div className="flex items-center gap-1 md:gap-3 ml-4 flex-shrink-0">
    <Button variant="outline" onClick={() => onToggleImportant(todo.id)}>
      <Star className={todo.important ? "text-yellow-400 fill-yellow-400" : "text-gray-400"} />
    </Button>
    <Button variant="outline" onClick={() => onToggleArchive(todo.id)}>
      <Archive className={todo.archived ? "text-purple-500" : "text-gray-400"} />
    </Button>
    <Button variant="outline" onClick={() => onEdit(todo.id)}>
      <Edit2 className="text-blue-500" />
    </Button>
  </div>
</div>

  );
}
