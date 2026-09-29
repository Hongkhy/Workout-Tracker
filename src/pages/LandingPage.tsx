import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AuthMode = "signup" | "signin" | null;

function LandingPage() {
  const [mode, setMode] = useState<AuthMode>(null);
  const navigate = useNavigate();

  function continueToDashboard(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <main className="auth-screen">
      <section className="auth-card" aria-labelledby="auth-heading">
        {mode === null ? (
          <>
            <h1 id="auth-heading">Welcome</h1>
            <p className="auth-subtitle">
              Sign in or create an account to continue.
            </p>
            <div className="auth-actions">
              <button
                className="auth-primary"
                onClick={() => setMode("signup")}
                type="button"
              >
                Sign up <ArrowRight size={15} />
              </button>
              <button
                className="auth-secondary"
                onClick={() => setMode("signin")}
                type="button"
              >
                Sign in
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="auth-back"
              onClick={() => setMode(null)}
              type="button"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h1 id="auth-heading">
              {mode === "signup" ? "Create your account" : "Sign in"}
            </h1>
            <p className="auth-subtitle">
              {mode === "signup"
                ? "A fresh start, at your pace."
                : "Welcome back. Pick up where you left off."}
            </p>
            <form className="auth-form" onSubmit={continueToDashboard}>
              {mode === "signup" && (
                <label>
                  Your name
                  <input
                    autoComplete="name"
                    name="name"
                    placeholder="Jamie Davis"
                    required
                  />
                </label>
              )}
              <label>
                Email address
                <input
                  autoComplete="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </label>
              <label>
                Password
                <input
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  minLength={8}
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  type="password"
                />
              </label>
              <button className="auth-primary auth-submit" type="submit">
                {mode === "signup" ? "Create account" : "Sign in"}{" "}
                <ArrowRight size={15} />
              </button>
            </form>
            <p className="auth-switch">
              {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
              <button
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                type="button"
              >
                {mode === "signup" ? "Sign in" : "Sign up"}
              </button>
            </p>
          </>
        )}
        <div className="auth-divider">
          <span />
          SECURE ACCOUNT ACCESS
          <span />
        </div>
        <p className="auth-note">
          <Check size={12} /> Your fitness journey, on your terms.
        </p>
      </section>
    </main>
  );
}

export default LandingPage;
