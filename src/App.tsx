import { useState } from "react";
import type { FormEvent } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  ChevronDown,
  Dumbbell,
  LayoutDashboard,
  Menu,
  Plus,
  Settings as SettingsIcon,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import Schedule from "./pages/Schedule";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";
import type { AppOutletContext, Workout, WorkoutType } from "./types";
import "./App.css";
import "./pages.css";

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Workouts", path: "/workouts", icon: Dumbbell },
  { label: "Progress", path: "/progress", icon: TrendingUp },
  { label: "Schedule", path: "/schedule", icon: CalendarDays },
  { label: "Goals", path: "/goals", icon: Target },
];

const pageNames: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/workouts": "Workouts",
  "/progress": "Progress",
  "/schedule": "Schedule",
  "/goals": "Goals",
  "/settings": "Settings",
};

function PageOutlet({ context }: { context: AppOutletContext }) {
  return (
    <div className="dashboard-content">
      <Outlet context={context} />
    </div>
  );
}

function App() {
  const location = useLocation();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState<WorkoutType>("Strength");
  const [workoutDuration, setWorkoutDuration] = useState("");
  const [workoutCalories, setWorkoutCalories] = useState("");
  const [toast, setToast] = useState("");
  const normalizedPath = location.pathname.replace(/\/$/, "") || "/";
  const pageTitle = pageNames[normalizedPath] ?? "Dashboard";

  function addWorkout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!workoutName.trim()) return;

    setWorkouts((current) => [
      {
        name: workoutName.trim(),
        detail: workoutType,
        time: new Date().toLocaleString(),
        duration: `${workoutDuration} min`,
        calories: workoutCalories,
        kind:
          workoutType === "Cycling"
            ? "ride"
            : workoutType === "Running"
              ? "run"
              : "strength",
      },
      ...current,
    ]);
    setWorkoutName("");
    setWorkoutDuration("");
    setWorkoutCalories("");
    setShowWorkoutForm(false);
    setToast("Workout added");
    window.setTimeout(() => setToast(""), 2800);
  }

  const pageContext = {
    workouts,
    onOpenWorkout: () => setShowWorkoutForm(true),
  };

  if (normalizedPath === "/") {
    return <LandingPage />;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <NavLink
          className="brand"
          to="/dashboard"
          onClick={() => setMobileNavOpen(false)}
        >
          <span className="brand-mark">
            <Activity size={19} strokeWidth={2.5} />
          </span>
          <span>
            fit<span className="brand-light">track</span>
          </span>
        </NavLink>
        <div className="side-label">MENU</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              className={({ isActive }) =>
                `nav-item ${isActive ? "nav-item-active" : ""}`
              }
              end
              key={path}
              onClick={() => setMobileNavOpen(false)}
              to={path}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Workouts" && (
                <span className="nav-count">{workouts.length}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="side-label tools-label">PREFERENCES</div>
        <NavLink
          className={({ isActive }) =>
            `nav-item ${isActive ? "nav-item-active" : ""}`
          }
          onClick={() => setMobileNavOpen(false)}
          to="/settings"
        >
          <SettingsIcon size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </NavLink>
        <div className="sidebar-spacer" />
        <button className="help-link" type="button">
          <span className="help-mark">?</span> Help & support
        </button>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumb">
            <span>Pages</span>
            <span className="crumb-slash">/</span>
            <strong>{pageTitle}</strong>
          </div>
          <div className="topbar-actions">
            <div className="popover-wrap">
              <button
                className={`icon-button notification-button ${showNotifications ? "icon-button-on" : ""}`}
                type="button"
                aria-label="Notifications"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
              >
                <Bell size={18} />
              </button>
              {showNotifications && (
                <div className="popover notification-popover">
                  <strong>No notifications</strong>
                </div>
              )}
            </div>
            <div className="profile-wrap popover-wrap">
              <button
                className="profile-button"
                type="button"
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
              >
                <span className="avatar">?</span>
                <span className="profile-copy">
                  <strong>Account</strong>
                  <small>Profile</small>
                </span>
                <ChevronDown size={15} />
              </button>
              {showProfile && (
                <div className="popover profile-popover">
                  <strong>Account</strong>
                  <NavLink onClick={() => setShowProfile(false)} to="/settings">
                    Account settings
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </header>

        <Routes>
          <Route element={<PageOutlet context={pageContext} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="progress" element={<Progress />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="goals" element={<Goals />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </main>

      {showWorkoutForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowWorkoutForm(false);
          }}
        >
          <form className="workout-modal" onSubmit={addWorkout}>
            <div className="modal-heading">
              <span className="modal-icon">
                <Dumbbell size={19} />
              </span>
              <button
                className="icon-button modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setShowWorkoutForm(false)}
              >
                <X size={19} />
              </button>
            </div>
            <p className="panel-kicker">A LITTLE PROGRESS ADDS UP</p>
            <h2>Log a workout</h2>
            <p className="modal-copy">
              Enter the details for this session.
            </p>
            <label htmlFor="workout-name">Workout name</label>
            <input
              autoFocus
              id="workout-name"
              value={workoutName}
              onChange={(event) => setWorkoutName(event.target.value)}
              placeholder="e.g. Evening walk"
              required
            />
            <label htmlFor="workout-type">Activity type</label>
            <select
              id="workout-type"
              value={workoutType}
              onChange={(event) =>
                setWorkoutType(event.target.value as WorkoutType)
              }
            >
              <option>Strength</option>
              <option>Running</option>
              <option>Cycling</option>
            </select>
            <label htmlFor="workout-duration">Duration (minutes)</label>
            <input
              id="workout-duration"
              min="1"
              required
              type="number"
              value={workoutDuration}
              onChange={(event) => setWorkoutDuration(event.target.value)}
            />
            <label htmlFor="workout-calories">Calories burned</label>
            <input
              id="workout-calories"
              min="0"
              required
              type="number"
              value={workoutCalories}
              onChange={(event) => setWorkoutCalories(event.target.value)}
            />
            <div className="modal-actions">
              <button
                className="cancel-button"
                type="button"
                onClick={() => setShowWorkoutForm(false)}
              >
                Cancel
              </button>
              <button className="primary-button" type="submit">
                <Plus size={16} /> Add workout
              </button>
            </div>
          </form>
        </div>
      )}
      {toast && (
        <div className="toast-message">
          <span>✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
