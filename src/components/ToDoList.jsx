import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState('');
  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem('todos', json);
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-list-container">
      <h2 className="todo-list-header">To-Do</h2>        
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
