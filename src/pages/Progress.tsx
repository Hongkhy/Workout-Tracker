import { useState } from "react";
import {
  Activity,
  Flame,
  Footprints,
  HeartPulse,
  TrendingUp,
} from "lucide-react";

const week = [38, 61, 48, 82, 56, 94, 45];
const month = [48, 68, 54, 88];
const progressPeriods = ["Week", "Month"] as const;

function Progress() {
  const [period, setPeriod] = useState<"Week" | "Month">("Week");
  const values = period === "Week" ? week : month;
  const labels =
    period === "Week"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      : ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];

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
        <div className="range-switch" role="group" aria-label="Progress range">
          {progressPeriods.map((item) => (
            <button
              className={period === item ? "range-active" : ""}
              key={item}
              onClick={() => setPeriod(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <section className="page-stat-row progress-stat-row">
        <article className="page-stat">
          <span>
            <Footprints size={15} /> Steps this week
          </span>
          <strong>54,820</strong>
          <small className="stat-positive">
            ↑ 14.2% from last {period.toLowerCase()}
          </small>
        </article>
        <article className="page-stat">
          <span>
            <Activity size={15} /> Active time
          </span>
          <strong>6h 24m</strong>
          <small className="stat-positive">
            ↑ 1h 12m from last {period.toLowerCase()}
          </small>
        </article>
        <article className="page-stat">
          <span>
            <Flame size={15} /> Calories burned
          </span>
          <strong>3,486</strong>
          <small className="stat-positive">
            ↑ 8.6% from last {period.toLowerCase()}
          </small>
        </article>
      </section>
      <section className="panel page-panel progress-chart-panel">
        <div className="page-panel-heading">
          <div>
            <p className="panel-kicker">ACTIVITY TREND</p>
            <h2>Movement over time</h2>
          </div>
          <span className="summary-delta">
            <TrendingUp size={14} /> 14.2%
          </span>
        </div>
        <div className="progress-chart">
          <div className="progress-axis">
            <span>12k</span>
            <span>9k</span>
            <span>6k</span>
            <span>3k</span>
            <span>0</span>
          </div>
          <div className="progress-bars">
            {values.map((value, index) => (
              <div className="progress-bar-column" key={labels[index]}>
                <div className="progress-bar-track">
                  <i style={{ height: `${value}%` }} />
                </div>
                <span>{labels[index]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-legend">
          <span>
            <i className="legend-move" /> Daily steps
          </span>
          <span className="chart-note">Goal: 10,000 steps</span>
        </div>
      </section>
      <section className="progress-bottom-grid">
        <article className="panel page-panel">
          <div className="page-panel-heading">
            <div>
              <p className="panel-kicker">WELLNESS CHECK-IN</p>
              <h2>Health averages</h2>
            </div>
          </div>
          <div className="health-row">
            <span className="health-icon heart-health">
              <HeartPulse size={17} />
            </span>
            <span>
              <strong>Resting heart rate</strong>
              <small>Steady this week</small>
            </span>
            <b>
              76 <small>BPM</small>
            </b>
          </div>
          <div className="health-row">
            <span className="health-icon step-health">
              <Footprints size={17} />
            </span>
            <span>
              <strong>Daily steps</strong>
              <small>Average per day</small>
            </span>
            <b>7,831</b>
          </div>
        </article>
        <article className="progress-note">
          <span className="note-spark">✳</span>
          <p className="panel-kicker">A NOTE FOR YOU</p>
          <h2>Consistency beats intensity.</h2>
          <p>
            You’ve moved on 5 of the last 7 days. That steady rhythm is what
            builds lasting progress.
          </p>
          <div className="note-streak">
            <span>5</span>
            <small>
              active days
              <br />
              this week
            </small>
          </div>
        </article>
      </section>
    </>
  );
}

export default Progress;
