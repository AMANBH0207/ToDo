import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Toaster from "./ui/Toaster"; // import Toaster component

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
  archived: boolean;
}

const LOCAL_STORAGE_KEY = "my-todo-app-todos";
const THEME_STORAGE_KEY = "my-todo-app-theme";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [text, setText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
    }
    return false;
  });

  // Toaster state
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Show toaster helper
  const showToaster = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // hide after 3 seconds
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Sync dark mode with <html data-theme>
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.removeAttribute("data-theme");
    }
    localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addOrUpdateTodo = () => {
    if (!text.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo) => (todo.id === editId ? { ...todo, text } : todo))
      );
      setEditId(null);
      showToaster("Task updated");
    } else {
      setTodos([
        ...todos,
        { id: Date.now(), text, completed: false, important: false, archived: false },
      ]);
      showToaster("Task added");
    }
    setText("");
  };

  const startEdit = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setText(todo.text);
      setEditId(id);
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    showToaster("Task completion toggled");
  };

  const toggleImportant = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, important: !t.important } : t))
    );
    showToaster("Task importance toggled");
  };

  const toggleArchive = (id: number) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          const newArchived = !t.archived;
          showToaster(newArchived ? "Task archived" : "Task unarchived");
          return { ...t, archived: newArchived };
        }
        return t;
      })
    );
  };

  const archivedTodos = todos.filter(todo => todo.archived);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-6 relative dark:bg-gray-900 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 flex-grow">
            🌟 My Todo App
          </h1>
          <button
            onClick={toggleDarkMode}
            className="ml-4 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark Mode"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>

        <TodoForm
          text={text}
          onTextChange={setText}
          onSubmit={addOrUpdateTodo}
          isEditing={editId !== null}
        />
        <TodoList
          todos={todos.filter(todo => !todo.archived)}
          onToggleComplete={toggleComplete}
          onToggleImportant={toggleImportant}
          onToggleArchive={toggleArchive}
          onEdit={startEdit}
        />
      </div>

      {/* Floating Archive Count Button */}
      <button
        onClick={() => setShowArchived(!showArchived)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        title="Show Archived Tasks"
        aria-label="Show Archived Tasks"
      >
        {archivedTodos.length}
      </button>

      {/* Archive Tasks Panel */}
      {showArchived && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-auto p-6 relative">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">Archived Tasks</h2>
            {archivedTodos.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No archived tasks</p>
            ) : (
              <ul className="space-y-3">
                {archivedTodos.map(todo => (
                  <li
                    key={todo.id}
                    className="border rounded p-3 flex justify-between items-center border-gray-300 dark:border-gray-700"
                  >
                    <span className="line-through text-gray-400 dark:text-gray-500">{todo.text}</span>
                    <button
                      onClick={() => toggleArchive(todo.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 font-semibold"
                      title="Unarchive task"
                    >
                      Unarchive
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setShowArchived(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold text-lg"
              aria-label="Close Archived Tasks"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Toaster Notification */}
      <Toaster message={toastMessage} show={showToast} />
    </div>
  );
}
