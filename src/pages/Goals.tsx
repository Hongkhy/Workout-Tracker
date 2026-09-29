import { useState } from "react";
import {
  Check,
  Dumbbell,
  Flame,
  Footprints,
  HeartPulse,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Goal = {
  id: number;
  title: string;
  detail: string;
  current: number;
  target: number;
  unit: string;
  icon: LucideIcon;
  color: string;
};

const initialGoals: Goal[] = [
  {
    id: 1,
    title: "Move 10,000 steps",
    detail: "Daily movement",
    current: 8432,
    target: 10000,
    unit: "steps",
    icon: Footprints,
    color: "goal-green",
  },
  {
    id: 2,
    title: "Train 4 times",
    detail: "Weekly workouts",
    current: 3,
    target: 4,
    unit: "sessions",
    icon: Dumbbell,
    color: "goal-orange",
  },
  {
    id: 3,
    title: "Stay active for 7 hours",
    detail: "Weekly active time",
    current: 6,
    target: 7,
    unit: "hours",
    icon: Flame,
    color: "goal-blue",
  },
];

function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [reminders, setReminders] = useState(true);
  const completedCount = goals.filter(
    (goal) => goal.current >= goal.target,
  ).length;

  function markComplete(id: number) {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === id ? { ...goal, current: goal.target } : goal,
      ),
    );
  }

  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">PROGRESS, ONE PROMISE AT A TIME</p>
          <h1>Goals</h1>
          <p className="welcome-subtitle">
            Set a direction. Celebrate each small win.
          </p>
        </div>
        <button
          className={`reminder-toggle ${reminders ? "toggle-on" : ""}`}
          aria-pressed={reminders}
          onClick={() => setReminders(!reminders)}
          type="button"
        >
          <span className="toggle-track">
            <i />
          </span>{" "}
          Reminders {reminders ? "on" : "off"}
        </button>
      </section>
      <section className="goals-summary">
        <div className="goals-summary-icon">
          <Trophy size={21} />
        </div>
        <div>
          <p className="panel-kicker">THIS WEEK</p>
          <strong>
            {completedCount} of {goals.length} goals completed
          </strong>
          <span>Keep going, Jamie. Your consistency is adding up.</span>
        </div>
        <div className="goals-summary-score">
          {Math.round((completedCount / goals.length) * 100)}
          <small>%</small>
        </div>
      </section>
      <section className="goals-page-grid">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const percent = Math.min(
            100,
            Math.round((goal.current / goal.target) * 100),
          );
          const isComplete = percent === 100;
          return (
            <article className="panel goal-item" key={goal.id}>
              <div className="goal-item-top">
                <span className={`goal-item-icon ${goal.color}`}>
                  <Icon size={19} />
                </span>
                <span
                  className={`goal-state ${isComplete ? "goal-state-done" : ""}`}
                >
                  {isComplete ? (
                    <>
                      <Check size={12} /> Complete
                    </>
                  ) : (
                    "In progress"
                  )}
                </span>
              </div>
              <p className="panel-kicker">{goal.detail}</p>
              <h2>{goal.title}</h2>
              <div className="goal-item-numbers">
                <strong>
                  {goal.current.toLocaleString()} <small>{goal.unit}</small>
                </strong>
                <span>
                  of {goal.target.toLocaleString()} {goal.unit}
                </span>
              </div>
              <div className="goal-progress goal-progress-large">
                <i style={{ width: `${percent}%` }} />
              </div>
              <div className="goal-item-bottom">
                <span>{percent}% complete</span>
                {!isComplete && (
                  <button
                    className="text-button"
                    onClick={() => markComplete(goal.id)}
                    type="button"
                  >
                    Mark done <span>→</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </section>
      <section className="goal-encouragement">
        <span>
          <HeartPulse size={17} />
        </span>
        <div>
          <strong>Rest is part of the plan, too.</strong>
          <small>
            Recovery helps you come back stronger. Your weekly goals leave room
            for it.
          </small>
        </div>
      </section>
    </>
  );
}

export default Goals;
