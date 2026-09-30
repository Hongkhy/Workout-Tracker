import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Activity,
  Clock3,
  Dumbbell,
  Footprints,
  MoreHorizontal,
} from "lucide-react";
import type { AppOutletContext, Workout, WorkoutKind } from "../types";

function Dashboard() {
  const { workouts, onOpenWorkout } = useOutletContext<AppOutletContext>();
  const [today] = useState(() => new Date());
  const navigate = useNavigate();
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
      <section className="welcome-row">
        <div>
          <p className="eyebrow">
            {today.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1>Your activity</h1>
          <p className="welcome-subtitle">
            Your recorded workouts at a glance.
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

      <section className="metric-grid" aria-label="Workout totals">
        <article className="metric-card metric-steps">
          <div className="metric-top">
            <span className="metric-icon">
              <Footprints size={18} />
            </span>
          </div>
          <p className="metric-label">Workouts</p>
          <div className="metric-value">
            {workouts.length} <span>sessions</span>
          </div>
          <p className="metric-foot">Recorded sessions</p>
        </article>
        <article className="metric-card metric-heart">
          <div className="metric-top">
            <span className="metric-icon">
              <Clock3 size={18} />
            </span>
          </div>
          <p className="metric-label">Active time</p>
          <div className="metric-value">
            {activeTime}
          </div>
          <p className="metric-foot">Across recorded sessions</p>
        </article>
        <article className="metric-card metric-calories">
          <div className="metric-top">
            <span className="metric-icon">
              <Activity size={18} />
            </span>
          </div>
          <p className="metric-label">Calories burned</p>
          <div className="metric-value">
            {totalCalories.toLocaleString()} <span>kcal</span>
          </div>
          <p className="metric-foot">Across recorded sessions</p>
        </article>
      </section>

      <section className="panel workouts-panel">
        <div className="panel-heading workout-heading">
          <div>
            <p className="panel-kicker">KEEP THE MOMENTUM</p>
            <h2>Recent workouts</h2>
          </div>
          <button
            className="text-button"
            type="button"
            onClick={() => navigate("/workouts")}
          >
            View all <span>→</span>
          </button>
        </div>
        {workouts.length ? (
          <WorkoutRows workouts={workouts} />
        ) : (
          <div className="empty-state">
            <strong>No workouts recorded</strong>
            <span>Log a workout to see your activity here.</span>
          </div>
        )}
      </section>
      <footer className="dashboard-footer">
        <span>
          FITTRACK <i /> YOUR JOURNEY, YOUR PACE
        </span>
      </footer>
    </>
  );
}

export function WorkoutRows({ workouts }: { workouts: Workout[] }) {
  function Icon({ kind }: { kind: WorkoutKind }) {
    return kind === "run" ? (
      <Footprints size={17} />
    ) : kind === "ride" ? (
      <Activity size={17} />
    ) : (
      <Dumbbell size={17} />
    );
  }

  return (
    <>
      <div className="workout-table">
        <div className="workout-table-head">
          <span>WORKOUT</span>
          <span>DATE & TIME</span>
          <span>DURATION</span>
          <span>CALORIES</span>
          <span />
        </div>
        {workouts.map((workout, index) => (
          <div className="workout-row" key={`${workout.name}-${index}`}>
            <span className="workout-name-cell">
              <span className={`workout-icon workout-icon-${workout.kind}`}>
                <Icon kind={workout.kind} />
              </span>
              <span>
                <strong>{workout.name}</strong>
                <small>{workout.detail}</small>
              </span>
            </span>
            <span className="workout-date">{workout.time}</span>
            <span className="workout-duration">
              <Clock3 size={14} /> {workout.duration}
            </span>
            <span className="workout-calories">
              {workout.calories} <small>kcal</small>
            </span>
            <button
              className="more-button row-more"
              type="button"
              aria-label={`More options for ${workout.name}`}
            >
              <MoreHorizontal size={19} />
            </button>
          </div>
        ))}
      </div>
      <div className="mobile-workout-list">
        {workouts.map((workout, index) => (
          <div
            className="mobile-workout"
            key={`${workout.name}-mobile-${index}`}
          >
            <span className={`workout-icon workout-icon-${workout.kind}`}>
              <Icon kind={workout.kind} />
            </span>
            <span className="mobile-workout-info">
              <strong>{workout.name}</strong>
              <small>
                {workout.time} · {workout.duration}
              </small>
            </span>
            <span className="workout-calories">
              {workout.calories}
              <small> kcal</small>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
