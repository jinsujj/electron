import { Todo } from "@preload/global";
import { useEffect, useState } from "react";

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    const loadTodos = async () => {
        const result = await window.todoAPI.getTodos();
        setTodos(result);
    }

    const addTodo = async () => {
        if(input.trim()){
            const newTodo = await window.todoAPI.addTodo(input);
            setTodos([...todos, newTodo]);
            setInput('')
        }
    }

    const toggle = async (id: number) => {
        await window.todoAPI.toggleTodo(id);
        loadTodos();
    };


    useEffect(() => {
        loadTodos();
    },[]);

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">
                📋 Todo List
            </h2>
            <div className="flex gap-2">
                <input
                    className="border rounded px-2 py-1 flex-grow"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={addTodo}
                >
                    추가
                </button>
            </div>
            <ul className="space-y-1">
                {todos.map(todo => (
                    <li key={todo.id} onClick={() => toggle(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>  
    )
}