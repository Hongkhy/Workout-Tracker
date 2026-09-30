import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { WorkoutRows } from "./Dashboard";
import type { AppOutletContext, WorkoutKind } from "../types";

function Workouts() {
  const { workouts, onOpenWorkout } = useOutletContext<AppOutletContext>();
  const [query, setQuery] = useState("");
  const filters = ["All", "Running", "Strength", "Cycling"] as const;
  type WorkoutFilter = (typeof filters)[number];
  const [filter, setFilter] = useState<WorkoutFilter>("All");
  const filterKinds: Record<Exclude<WorkoutFilter, "All">, WorkoutKind> = {
    Running: "run",
    Strength: "strength",
    Cycling: "ride",
  };
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesQuery = `${workout.name} ${workout.detail}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesType =
      filter === "All" || workout.kind === filterKinds[filter];
    return matchesQuery && matchesType;
  });
  const totalMinutes = workouts.reduce(
    (total, workout) => total + (Number.parseInt(workout.duration, 10) || 0),
    0,
  );
  const totalCalories = workouts.reduce(
    (total, workout) => total + (Number.parseInt(workout.calories, 10) || 0),
    0,
  );
  const activeTime =
    totalMinutes >= 60
      ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
      : `${totalMinutes} min`;

  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">YOUR TRAINING LOG</p>
          <h1>Workouts</h1>
          <p className="welcome-subtitle">
            Every session counts. Keep your momentum going.
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
      <section className="page-stat-row">
        <article className="page-stat">
          <span>Total sessions</span>
          <strong>{workouts.length}</strong>
          <small>Recorded workouts</small>
        </article>
        <article className="page-stat">
          <span>Time active</span>
          <strong>{activeTime}</strong>
          <small>Across all sessions</small>
        </article>
        <article className="page-stat">
          <span>Calories burned</span>
          <strong>{totalCalories.toLocaleString()}</strong>
          <small>Across all sessions</small>
        </article>
      </section>
      <section className="panel page-panel">
        <div className="page-panel-heading">
          <div>
            <p className="panel-kicker">ALL ACTIVITY</p>
            <h2>Workout history</h2>
          </div>
          <span className="history-count">
            {filteredWorkouts.length} sessions
          </span>
        </div>
        <div className="workout-controls">
          <label className="search-field">
            <Search size={16} />
            <input
              aria-label="Search workouts"
              placeholder="Search workouts"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="filter-row" aria-label="Filter workouts">
            <SlidersHorizontal size={15} />
            {filters.map((item) => (
              <button
                className={filter === item ? "filter-active" : ""}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {filteredWorkouts.length ? (
          <WorkoutRows workouts={filteredWorkouts} />
        ) : (
          <div className="empty-state">
            <strong>
              {workouts.length ? "No workouts found" : "No workouts recorded"}
            </strong>
            <span>
              {workouts.length
                ? "Try a different search or activity type."
                : "Log a workout to build your activity history."}
            </span>
          </div>
        )}
      </section>
    </>
  );
}

export default Workouts;
