//Matrikelnummer: 9147121

import React from 'react';
import './calendar.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Day = ({ number, id }) => {
  const [todos, setTodos] = React.useState(() => JSON.parse(localStorage.getItem(`todos-${id}`)) || []);
  return (
    <div className="day">
      <Link to={`/todo/${number}`}> To-Dos: {todos.length} </Link>
    </div>
  );
};

const Calendar = () => {
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
                {day && (
                  <>
                    <span className="day-number">{day}</span>
                    <br />
                    <Day number={day} id={day} />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
