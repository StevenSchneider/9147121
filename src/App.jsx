import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([])

  return (
    <div>
      <h1>Calendar + To-Do-List Project</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/todo" element={<TodoList todos={todos} setTodos={setTodos} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
