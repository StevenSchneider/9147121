import React, { useState, useEffect } from 'react';
import './TodoList.css';
import { useParams } from 'react-router-dom';

const TodoList = () => {
  const {day} = useParams();
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem(`todos-${day}`)) || []);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEdit] = useState(null);
  const [editingText, setEditText] = useState("");

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem(`todos-${day}`, json);
  }, [todos, day]);

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

  const toggleCompleted = (id) => {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const submitEdits = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEdit(null);
  }

  return (
    <div className="todo-list-container">
      <h2 className="todo-list-header">To-Dos for Today</h2>        
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul className="todo-list">
      {todos.map((todo) => (
          <div key={todo.id} >
            <div >
              <input
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
              />
              {todo.id === todoEditing ? (
                <input
                  type="text"
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <div><span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span></div>
              )}
            </div>
            <div >
              {todo.id === todoEditing ? (
                <button onClick={() => submitEdits(todo.id)}>Submit</button>
              ) : (
                <button onClick={() => setTodoEdit(todo.id)}>Edit</button>
              )}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
