import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import React, { useState } from 'react';

const App = () => {

  return (
    <div>
      <h1>Calendar + To-Do-List Project</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/todo/:day" element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
