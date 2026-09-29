import { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Globe2,
  HeartPulse,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Preferences = {
  workoutReminders: boolean;
  weeklySummary: boolean;
  healthInsights: boolean;
};

type PreferenceKey = keyof Preferences;
const unitOptions = ["Metric", "Imperial"] as const;

function Settings() {
  const [units, setUnits] = useState<"Metric" | "Imperial">("Metric");
  const [settings, setSettings] = useState<Preferences>({
    workoutReminders: true,
    weeklySummary: true,
    healthInsights: false,
  });
  const [saved, setSaved] = useState(false);

  function toggle(key: PreferenceKey) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
    setSaved(false);
  }

  return (
    <>
      <section className="page-intro">
        <div>
          <p className="eyebrow">MAKE FITTRACK YOURS</p>
          <h1>Settings</h1>
          <p className="welcome-subtitle">
            Manage your preferences and account details.
          </p>
        </div>
        {saved && (
          <span className="saved-state">
            <Check size={14} /> Preferences saved
          </span>
        )}
      </section>
      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          <a className="settings-tab settings-tab-active" href="#profile">
            <UserRound size={16} /> Profile
          </a>
          <a className="settings-tab" href="#preferences">
            <Globe2 size={16} /> Preferences
          </a>
          <a className="settings-tab" href="#notifications">
            <Bell size={16} /> Notifications
          </a>
          <a className="settings-tab" href="#privacy">
            <ShieldCheck size={16} /> Privacy
          </a>
        </nav>
        <div className="settings-content">
          <section id="profile" className="panel settings-panel">
            <div className="page-panel-heading">
              <div>
                <p className="panel-kicker">YOUR ACCOUNT</p>
                <h2>Profile information</h2>
              </div>
            </div>
            <div className="profile-edit-row">
              <span className="avatar profile-avatar-large">JD</span>
              <span>
                <strong>Jamie Davis</strong>
                <small>jamie.davis@email.com</small>
              </span>
              <button
                className="cancel-button"
                type="button"
                onClick={() => setSaved(false)}
              >
                Edit profile
              </button>
            </div>
            <div className="settings-fields">
              <label>
                Display name
                <input
                  defaultValue="Jamie Davis"
                  onChange={() => setSaved(false)}
                />
              </label>
              <label>
                Email address
                <input
                  defaultValue="jamie.davis@email.com"
                  onChange={() => setSaved(false)}
                />
              </label>
            </div>
          </section>
          <section id="preferences" className="panel settings-panel">
            <div className="page-panel-heading">
              <div>
                <p className="panel-kicker">YOUR PREFERENCES</p>
                <h2>Units & activity</h2>
              </div>
            </div>
            <div className="unit-setting">
              <span className="setting-icon">
                <Globe2 size={16} />
              </span>
              <span>
                <strong>Measurement units</strong>
                <small>Choose how distance and weight are shown.</small>
              </span>
              <div className="range-switch">
                {unitOptions.map((unit) => (
                  <button
                    className={units === unit ? "range-active" : ""}
                    key={unit}
                    onClick={() => {
                      setUnits(unit);
                      setSaved(false);
                    }}
                    type="button"
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </section>
          <section id="notifications" className="panel settings-panel">
            <div className="page-panel-heading">
              <div>
                <p className="panel-kicker">STAY IN THE LOOP</p>
                <h2>Notifications</h2>
              </div>
            </div>
            <SettingToggle
              icon={Clock3}
              title="Workout reminders"
              description="A nudge before your planned sessions."
              enabled={settings.workoutReminders}
              onChange={() => toggle("workoutReminders")}
            />
            <SettingToggle
              icon={Bell}
              title="Weekly activity summary"
              description="Get a recap of your movement each week."
              enabled={settings.weeklySummary}
              onChange={() => toggle("weeklySummary")}
            />
            <SettingToggle
              icon={HeartPulse}
              title="Health insights"
              description="Occasional insights about your activity trends."
              enabled={settings.healthInsights}
              onChange={() => toggle("healthInsights")}
            />
          </section>
          <section id="privacy" className="panel settings-panel privacy-row">
            <span className="setting-icon">
              <ShieldCheck size={17} />
            </span>
            <span>
              <strong>Your data stays yours</strong>
              <small>Manage your privacy and connected health services.</small>
            </span>
            <button
              className="more-button"
              aria-label="Open privacy options"
              type="button"
            >
              <ChevronRight size={17} />
            </button>
          </section>
          <button
            className="primary-button settings-save"
            onClick={() => setSaved(true)}
            type="button"
          >
            Save preferences
          </button>
        </div>
      </div>
    </>
  );
}

function SettingToggle({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="setting-toggle-row">
      <span className="setting-icon">
        <Icon size={16} />
      </span>
      <span className="setting-copy">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <button
        className={`switch ${enabled ? "switch-on" : ""}`}
        aria-label={`${title}: ${enabled ? "on" : "off"}`}
        aria-pressed={enabled}
        onClick={onChange}
        type="button"
      >
        <i />
      </button>
    </div>
  );
}

export default Settings;
