import React, { useState } from 'react';
import './calendar.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Calendar() {
  const now = moment();
  const daysInMonth = now.daysInMonth();
  const monthStart = now.startOf('month').day() === 0 ? 7 : now.startOf('month').day();
  const weeks = [];

  let week = [];
  for (let i = 1; i < monthStart; i++) {
    week.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    week.push(i);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {now.format('MMMM YYYY')}
      </div>
      <div className="calendar-days">
        <div className="calendar-week">
          {dayNames.map((dayName) => (
            <div key={`day-${dayName}`} className="calendar-day-name">
              {dayName}
            </div>
          ))}
        </div>
        {weeks.map((week, index) => (
          <div key={`week-${index}`} className="calendar-week">
            {week.map((day) => (
              <div key={`day-${day}`} className="calendar-day">
                {day &&
                  <Link to={`/todo/${day}`}>
                    {day}
                  </Link>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

//function ToDoList(props) {
//  const [newTask, setNewTask] = useState('');
//  const [tasks, setTasks] = useState(props.tasks);

//  const handleNewTaskChange = (event) => {
//    setNewTask(event.target.value);
//  }

//  const handleNewTaskSubmit = (event) => {
//    event.preventDefault();
//    setTasks([...tasks, newTask]);
//    setNewTask('');
//  }

//  return (
//    <div>
//      <h2>To-Do List for {props.date}</h2>
//      <form onSubmit={handleNewTaskSubmit}>
//        <input type="text" value={newTask} onChange={handleNewTaskChange} />
//        <button type="submit">Add Task</button>
//      </form>
//      <ul>
//        {tasks.map((task, index) => (
//          <li key={index}>{task}</li>
//        ))}
//      </ul>
//    </div>
//  );
//}

export default Calendar;
//export { ToDoList };