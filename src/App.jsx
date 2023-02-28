//Matrikelnummer: 9147121

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import React from 'react';

const App = () => {

  return (
    <div>
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
