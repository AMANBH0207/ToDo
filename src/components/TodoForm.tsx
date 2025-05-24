import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface Props {
  text: string;
  isEditing: boolean;
  onTextChange: (value: string) => void;
  onSubmit: () => void;
}

export default function TodoForm({ text, onTextChange, onSubmit, isEditing }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      <Input
  placeholder="Enter a task..."
  value={text}
  onChange={(e) => onTextChange(e.target.value)}
  className="flex-1 placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 text-black dark:text-white"
/>
      <Button onClick={onSubmit}>{isEditing ? "Update" : "Add"}</Button>
    </div>
  );
}
