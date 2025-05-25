interface ToasterProps {
  message: string;
  show: boolean;
}

export default function Toaster({ message, show }: ToasterProps) {
  return (
    <div
  className={`fixed top-6 right-6 bg-gray-800 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
    show ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
  {message}
</div>
  );
}
