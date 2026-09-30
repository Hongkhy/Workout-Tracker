import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import type { AppOutletContext } from "../types";

function Schedule() {
  const { onOpenWorkout } = useOutletContext<AppOutletContext>();
  const [today] = useState(() => new Date());
  const currentDay = (today.getDay() + 6) % 7;
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [weekOffset, setWeekOffset] = useState(0);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - currentDay + weekOffset * 7);
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return {
      day: date.toLocaleDateString(undefined, { weekday: "short" }),
      date,
    };
  });
  const selected = weekdays[selectedDay];
  const weekEnd = weekdays[6].date;
  const weekLabel = `${weekStart.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${weekEnd.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;

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
          + Log a workout
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
              onClick={() => setWeekOffset(weekOffset - 1)}
              type="button"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="today-button"
              onClick={() => {
                setWeekOffset(0);
                setSelectedDay(currentDay);
              }}
              type="button"
            >
              Today
            </button>
            <button
              className="icon-button"
              aria-label="Next week"
              onClick={() => setWeekOffset(weekOffset + 1)}
              type="button"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="week-strip">
          {weekdays.map((item, index) => (
            <button
              className={`day-cell ${selectedDay === index ? "day-selected" : ""}`}
              key={item.date.toISOString()}
              onClick={() => setSelectedDay(index)}
              type="button"
            >
              <span>{item.day}</span>
              <strong>{item.date.getDate()}</strong>
              <i />
            </button>
          ))}
        </div>
      </section>
      <section className="schedule-day-layout">
        <article className="panel page-panel agenda-panel">
          <div className="page-panel-heading">
            <div>
              <p className="panel-kicker">
                {selected.date.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2>Planned sessions</h2>
            </div>
            <span className="agenda-count">0 sessions</span>
          </div>
          <div className="empty-state">
            <span className="empty-icon">
              <CalendarDays size={20} />
            </span>
            <strong>No sessions planned</strong>
            <span>There are no sessions for this day.</span>
          </div>
        </article>
      </section>
    </>
  );
}

export default Schedule;
