'use client'; // enables client-side interactivity

import { useEffect, useState } from 'react';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};


export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  // Fetch todos on load
  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  // Add a new todo
  async function addTodo() {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodoText }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  }

  // Update todo status
  async function toggleDone(todo: Todo) {
    const updated = { ...todo, done: !todo.done };
    await fetch('/api/todos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    setTodos(todos.map(t => t.id === todo.id ? updated : t));
  }

  // Delete a todo
  async function deleteTodo(id: string) {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter(t => t.id !== id));
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
          placeholder="New todo"
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center py-2">
            <span
              onClick={() => toggleDone(todo)}
              className={`cursor-pointer ${todo.done ? 'line-through text-gray-500' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}