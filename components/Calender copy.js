// components/CalendarView.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Link from 'next/link';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "SAIT's Community Volunteer Fair",
    start: new Date("January 25, 2024 10:00 AM"),
    end: new Date("January 25, 2024 3:00 PM"),
    link: 'https://www.sait.ca/events/2024/01/saits-community-volunteer-fair',
  },
  // Add more events if needed
];

const CalendarView = () => {
  
  return (
    <div>
      <h1>Event Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={['month', 'week', 'day']}
        eventPropGetter={(event) => ({
          className: 'cursor-pointer',
        })}
        onSelectEvent={(event) => window.open(event.link, '_blank')}
      />
    </div>
  );
};

export default CalendarView;
