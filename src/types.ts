export type WorkoutKind = "run" | "strength" | "ride";

export type WorkoutType = "Strength" | "Running" | "Cycling";

export type Workout = {
  name: string;
  detail: string;
  time: string;
  duration: string;
  calories: string;
  kind: WorkoutKind;
};

export type AppOutletContext = {
  workouts: Workout[];
  onOpenWorkout: () => void;
};
