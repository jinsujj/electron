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
        <div>
            <h2>📋 Todo List</h2>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={addTodo}>추가</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} onClick={() => toggle(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>  
    )
}