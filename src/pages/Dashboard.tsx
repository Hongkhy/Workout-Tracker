import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Activity,
  Clock3,
  Dumbbell,
  Flame,
  Footprints,
  HeartPulse,
  MoreHorizontal,
  TrendingUp,
  Trophy,
} from "lucide-react";
import type { AppOutletContext, Workout, WorkoutKind } from "../types";

const weekActivity = [
  { day: "Mon", value: 52, secondary: 28 },
  { day: "Tue", value: 72, secondary: 43 },
  { day: "Wed", value: 44, secondary: 36 },
  { day: "Thu", value: 86, secondary: 50 },
  { day: "Fri", value: 62, secondary: 33 },
  { day: "Sat", value: 96, secondary: 57 },
  { day: "Sun", value: 38, secondary: 24 },
];
const monthActivity = [
  { day: "Wk 1", value: 49, secondary: 32 },
  { day: "Wk 2", value: 72, secondary: 41 },
  { day: "Wk 3", value: 58, secondary: 45 },
  { day: "Wk 4", value: 91, secondary: 59 },
];
const activityRanges = ["Week", "Month"] as const;

function Dashboard() {
  const { workouts, onOpenWorkout } = useOutletContext<AppOutletContext>();
  const [range, setRange] = useState<"Week" | "Month">("Week");
  const activity = range === "Week" ? weekActivity : monthActivity;
  const navigate = useNavigate();

  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">TUESDAY, MAY 21, 2024</p>
          <h1>
            Good afternoon, Jamie <span className="wave">✳</span>
          </h1>
          <p className="welcome-subtitle">
            You’re building great habits. Here’s your activity at a glance.
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

      <section className="metric-grid" aria-label="Today's health metrics">
        <article className="metric-card metric-steps">
          <div className="metric-top">
            <span className="metric-icon">
              <Footprints size={18} />
            </span>
            <span className="metric-trend">
              <TrendingUp size={13} /> 12.8%
            </span>
          </div>
          <p className="metric-label">Steps</p>
          <div className="metric-value">
            8,432 <span>steps</span>
          </div>
          <div className="metric-progress">
            <span style={{ width: "70%" }} />
          </div>
          <p className="metric-foot">70% of your 12,000 daily goal</p>
        </article>
        <article className="metric-card metric-heart">
          <div className="metric-top">
            <span className="metric-icon">
              <HeartPulse size={18} />
            </span>
            <span className="metric-status">
              <i /> Resting
            </span>
          </div>
          <p className="metric-label">Heart rate</p>
          <div className="metric-value">
            78 <span>BPM</span>
          </div>
          <div className="sparkline" aria-label="Heart rate stable">
            {Array.from({ length: 17 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <p className="metric-foot">Within your healthy range</p>
        </article>
        <article className="metric-card metric-calories">
          <div className="metric-top">
            <span className="metric-icon">
              <Flame size={18} />
            </span>
            <span className="metric-trend">
              <TrendingUp size={13} /> 8.4%
            </span>
          </div>
          <p className="metric-label">Calories burned</p>
          <div className="metric-value">
            524 <span>kcal</span>
          </div>
          <div className="calorie-bars">
            {Array.from({ length: 28 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
          <p className="metric-foot">
            Today <b>·</b> 9% above your daily average
          </p>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">YOUR MOVEMENT</p>
              <h2>Weekly activity</h2>
            </div>
            <div
              className="range-switch"
              role="group"
              aria-label="Activity time range"
            >
              {activityRanges.map((option) => (
                <button
                  type="button"
                  className={range === option ? "range-active" : ""}
                  key={option}
                  onClick={() => setRange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="activity-summary">
            <strong>{range === "Week" ? "6h 24m" : "24h 18m"}</strong>
            <span className="summary-caption">active time</span>
            <span className="summary-delta">
              <TrendingUp size={13} /> 18.6%
            </span>
            <span className="summary-compare">
              vs. last {range.toLowerCase()}
            </span>
          </div>
          <div className="chart-wrap">
            <div className="chart-y-labels">
              <span>8h</span>
              <span>6h</span>
              <span>4h</span>
              <span>2h</span>
              <span>0</span>
            </div>
            <div className="chart-main">
              <div className="chart-gridlines">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="bar-chart">
                {activity.map((item) => (
                  <div className="bar-group" key={item.day}>
                    <div className="bar-pair">
                      <span
                        className="bar bar-primary"
                        style={{ height: `${item.value}%` }}
                      />
                      <span
                        className="bar bar-secondary"
                        style={{ height: `${item.secondary}%` }}
                      />
                    </div>
                    <span className="bar-label">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-move" /> Active time
            </span>
            <span>
              <i className="legend-workout" /> Workout time
            </span>
            <span className="chart-note">Updated just now</span>
          </div>
        </article>
        <article className="panel goal-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">STAY ON TRACK</p>
              <h2>Daily goals</h2>
            </div>
            <MoreHorizontal size={20} />
          </div>
          <div className="goal-ring-wrap">
            <div className="goal-ring">
              <div className="goal-ring-center">
                <span>72%</span>
                <small>completed</small>
              </div>
            </div>
          </div>
          <div className="goal-total">
            <strong>2,164</strong>
            <span> of 3,000 kcal</span>
          </div>
          <div className="goal-line">
            <span>Daily calorie target</span>
            <span>72%</span>
          </div>
          <div className="goal-progress">
            <i />
          </div>
          <div className="goal-foot">
            <span className="goal-check">
              <Trophy size={15} />
            </span>
            <span>
              <strong>You’re right on track!</strong>
              <small>836 kcal left to reach your goal</small>
            </span>
          </div>
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
        <WorkoutRows workouts={workouts} />
      </section>
      <footer className="dashboard-footer">
        <span>
          FITTRACK <i /> YOUR JOURNEY, YOUR PACE
        </span>
        <span>
          <span className="footer-live" /> All data synced
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
