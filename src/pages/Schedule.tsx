import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Dumbbell,
  Footprints,
} from "lucide-react";
import type { AppOutletContext } from "../types";

const weekdays = [
  {
    day: "Mon",
    date: 20,
    items: [{ title: "Easy recovery ride", time: "5:45 PM", type: "Cycling" }],
  },
  {
    day: "Tue",
    date: 21,
    items: [
      { title: "Morning run", time: "7:15 AM", type: "Running" },
      { title: "Mobility & stretch", time: "6:00 PM", type: "Recovery" },
    ],
  },
  {
    day: "Wed",
    date: 22,
    items: [{ title: "Full body strength", time: "6:30 PM", type: "Strength" }],
  },
  {
    day: "Thu",
    date: 23,
    items: [{ title: "Easy pace run", time: "7:00 AM", type: "Running" }],
  },
  { day: "Fri", date: 24, items: [] },
  {
    day: "Sat",
    date: 25,
    items: [{ title: "Long run", time: "8:00 AM", type: "Running" }],
  },
  { day: "Sun", date: 26, items: [] },
];

function Schedule() {
  const { onOpenWorkout } = useOutletContext<AppOutletContext>();
  const [selectedDate, setSelectedDate] = useState(21);
  const [weekOffset, setWeekOffset] = useState(0);
  const selected =
    weekdays.find((item) => item.date === selectedDate) ?? weekdays[1];
  const weekLabel =
    weekOffset === 0
      ? "May 20 – 26, 2024"
      : weekOffset < 0
        ? "May 13 – 19, 2024"
        : "May 27 – Jun 2, 2024";

  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">MAKE TIME FOR YOURSELF</p>
          <h1>Schedule</h1>
          <p className="welcome-subtitle">
            A little planning makes showing up easier.
          </p>
        </div>
        <button
          className="primary-button"
          onClick={onOpenWorkout}
          type="button"
        >
          + Plan a workout
        </button>
      </section>
      <section className="panel page-panel schedule-panel">
        <div className="schedule-toolbar">
          <div>
            <p className="panel-kicker">YOUR TRAINING PLAN</p>
            <h2>{weekLabel}</h2>
          </div>
          <div className="schedule-arrows">
            <button
              className="icon-button"
              aria-label="Previous week"
              onClick={() => setWeekOffset(Math.max(-1, weekOffset - 1))}
              type="button"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="today-button"
              onClick={() => {
                setWeekOffset(0);
                setSelectedDate(21);
              }}
              type="button"
            >
              Today
            </button>
            <button
              className="icon-button"
              aria-label="Next week"
              onClick={() => setWeekOffset(Math.min(1, weekOffset + 1))}
              type="button"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="week-strip">
          {weekdays.map((item) => (
            <button
              className={`day-cell ${selectedDate === item.date ? "day-selected" : ""}`}
              key={item.day}
              onClick={() => setSelectedDate(item.date)}
              type="button"
            >
              <span>{item.day}</span>
              <strong>{item.date + weekOffset * 7}</strong>
              <i className={item.items.length ? "day-has-event" : ""} />
            </button>
          ))}
        </div>
      </section>
      <section className="schedule-day-layout">
        <article className="panel page-panel agenda-panel">
          <div className="page-panel-heading">
            <div>
              <p className="panel-kicker">
                TUESDAY, MAY {selected.date + weekOffset * 7}
              </p>
              <h2>Today’s plan</h2>
            </div>
            <span className="agenda-count">
              {selected.items.length}{" "}
              {selected.items.length === 1 ? "session" : "sessions"}
            </span>
          </div>
          {selected.items.length ? (
            <div className="agenda-list">
              {selected.items.map((item) => (
                <div className="agenda-item" key={item.title}>
                  <span
                    className={`workout-icon workout-icon-${item.type === "Running" ? "run" : "strength"}`}
                  >
                    {item.type === "Running" ? (
                      <Footprints size={17} />
                    ) : (
                      <Dumbbell size={17} />
                    )}
                  </span>
                  <span className="agenda-info">
                    <strong>{item.title}</strong>
                    <small>{item.type}</small>
                  </span>
                  <span className="agenda-time">
                    <Clock3 size={14} />
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">
                <CalendarDays size={20} />
              </span>
              <strong>A little breathing room</strong>
              <span>No sessions planned for this day.</span>
              <button
                className="text-button"
                onClick={onOpenWorkout}
                type="button"
              >
                Add a workout <span>→</span>
              </button>
            </div>
          )}
        </article>
        <aside className="schedule-tip">
          <span className="panel-kicker">YOUR WEEK AT A GLANCE</span>
          <strong>4 sessions planned</strong>
          <div className="week-progress">
            <i />
          </div>
          <span>One rest day is built in. Nice balance.</span>
        </aside>
      </section>
    </>
  );
}

export default Schedule;
