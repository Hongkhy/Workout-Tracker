import { useOutletContext } from "react-router-dom";
import { Activity, Flame } from "lucide-react";
import type { AppOutletContext } from "../types";

function Progress() {
  const { workouts } = useOutletContext<AppOutletContext>();
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
          <p className="eyebrow">YOUR CONSISTENCY IS SHOWING</p>
          <h1>Progress</h1>
          <p className="welcome-subtitle">
            A clearer view of how far you’ve come.
          </p>
        </div>
      </section>
      <section className="page-stat-row progress-stat-row">
        <article className="page-stat">
          <span>Workouts</span>
          <strong>{workouts.length}</strong>
          <small>Recorded sessions</small>
        </article>
        <article className="page-stat">
          <span>
            <Activity size={15} /> Active time
          </span>
          <strong>{activeTime}</strong>
          <small>Across all sessions</small>
        </article>
        <article className="page-stat">
          <span>
            <Flame size={15} /> Calories burned
          </span>
          <strong>{totalCalories.toLocaleString()}</strong>
          <small>Across all sessions</small>
        </article>
      </section>
      <section className="panel page-panel progress-chart-panel">
        <div className="page-panel-heading">
          <div>
            <p className="panel-kicker">ACTIVITY TREND</p>
            <h2>Progress over time</h2>
          </div>
        </div>
        <div className="empty-state">
          <strong>Activity trends are not available yet</strong>
          <span>Trend reporting will be connected to workout data.</span>
        </div>
      </section>
    </>
  );
}

export default Progress;
