import TodoList from "./TodoList"

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Electron Todo App
      </h1>
      <TodoList/>
    </div>
  );
}
