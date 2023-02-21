import React, { useState } from 'react';
import './TodoList.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function TodoList({ todos, setTodos }) {
  const [newTodo, setNewTodo] = useState('');
  const { day } = useParams();
  const filteredTodos = day ? todos.filter(todo => moment(todo.id).date() === parseInt(day)) : todos;
  React.useEffect(() => {
    const json = JSON.stringify(filteredTodos);
    localStorage.setItem('todos', json);
  }, [filteredTodos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }
    setTodos([...filteredTodos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleCompleted = (id) => {
    setTodos(
      filteredTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(filteredTodos.filter((todo) => todo.id !== id));
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
        {filteredTodos.map((todo) => (
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

