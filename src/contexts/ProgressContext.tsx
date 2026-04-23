import { createContext, useContext, useState, useCallback, ReactNode, useEffect, useMemo } from "react";

export interface SavedProgram {
  id: string;
  savedAt: number;
  completedDays: string[]; // dayKey list (current "checked" set)
  totalDays: number;
}

// A session = one completed workout day, logged at a timestamp.
// Stored separately so weekly/streak views work independently of the toggle state.
export interface WorkoutSession {
  id: string; // unique session id
  programId: string;
  dayKey: string;
  completedAt: number; // ms epoch
}

interface ProgressContextType {
  savedPrograms: SavedProgram[];
  sessions: WorkoutSession[];
  isSaved: (id: string) => boolean;
  saveProgram: (id: string, totalDays: number) => void;
  removeProgram: (id: string) => void;
  toggleDay: (id: string, dayKey: string) => void;
  isDayComplete: (id: string, dayKey: string) => boolean;
  getProgress: (id: string) => { completed: number; total: number; percent: number };
  count: number;
  // New: streak + weekly helpers
  getCurrentStreak: () => number;
  getLongestStreak: () => number;
  getThisWeekDays: () => boolean[]; // length 7, Mon..Sun
  getTotalSessions: () => number;
  getSessionsThisWeek: () => number;
}

const ProgressContext = createContext<ProgressContextType>({
  savedPrograms: [],
  sessions: [],
  isSaved: () => false,
  saveProgram: () => {},
  removeProgram: () => {},
  toggleDay: () => {},
  isDayComplete: () => false,
  getProgress: () => ({ completed: 0, total: 0, percent: 0 }),
  count: 0,
  getCurrentStreak: () => 0,
  getLongestStreak: () => 0,
  getThisWeekDays: () => [false, false, false, false, false, false, false],
  getTotalSessions: () => 0,
  getSessionsThisWeek: () => 0,
});

export const useProgress = () => useContext(ProgressContext);

const STORAGE_KEY = "mf-saved-programs";
const SESSIONS_KEY = "mf-workout-sessions";

// Local-day key (YYYY-MM-DD) ignoring TZ shifts
const dayKeyFromDate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// Monday as start of week (matches most fitness apps)
const startOfWeek = (d: Date) => {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = x.getDay(); // 0=Sun..6=Sat
  const diff = (day + 6) % 7; // days since Monday
  x.setDate(x.getDate() - diff);
  return x;
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [savedPrograms, setSavedPrograms] = useState<SavedProgram[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [sessions, setSessions] = useState<WorkoutSession[]>(() => {
    try {
      const raw = localStorage.getItem(SESSIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPrograms));
  }, [savedPrograms]);

  useEffect(() => {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const isSaved = useCallback(
    (id: string) => savedPrograms.some((p) => p.id === id),
    [savedPrograms]
  );

  const saveProgram = useCallback((id: string, totalDays: number) => {
    setSavedPrograms((prev) => {
      if (prev.some((p) => p.id === id)) return prev;
      return [
        ...prev,
        { id, savedAt: Date.now(), completedDays: [], totalDays },
      ];
    });
  }, []);

  const removeProgram = useCallback((id: string) => {
    setSavedPrograms((prev) => prev.filter((p) => p.id !== id));
    setSessions((prev) => prev.filter((s) => s.programId !== id));
  }, []);

  const toggleDay = useCallback((id: string, dayKey: string) => {
    setSavedPrograms((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              completedDays: p.completedDays.includes(dayKey)
                ? p.completedDays.filter((d) => d !== dayKey)
                : [...p.completedDays, dayKey],
            }
          : p
      )
    );

    // Log a session when toggling ON. When toggling OFF, remove today's session for that day.
    setSessions((prev) => {
      const program = savedPrograms.find((p) => p.id === id);
      const wasComplete = program?.completedDays.includes(dayKey) ?? false;
      if (wasComplete) {
        // Toggling OFF — remove the most recent session matching today
        const todayKey = dayKeyFromDate(new Date());
        const idx = [...prev]
          .map((s, i) => ({ s, i }))
          .reverse()
          .find(
            ({ s }) =>
              s.programId === id &&
              s.dayKey === dayKey &&
              dayKeyFromDate(new Date(s.completedAt)) === todayKey
          );
        if (idx) {
          const next = [...prev];
          next.splice(idx.i, 1);
          return next;
        }
        return prev;
      }
      // Toggling ON — add session timestamped now
      return [
        ...prev,
        {
          id: `${id}-${dayKey}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          programId: id,
          dayKey,
          completedAt: Date.now(),
        },
      ];
    });
  }, [savedPrograms]);

  const isDayComplete = useCallback(
    (id: string, dayKey: string) => {
      const program = savedPrograms.find((p) => p.id === id);
      return program?.completedDays.includes(dayKey) ?? false;
    },
    [savedPrograms]
  );

  const getProgress = useCallback(
    (id: string) => {
      const program = savedPrograms.find((p) => p.id === id);
      if (!program) return { completed: 0, total: 0, percent: 0 };
      const completed = program.completedDays.length;
      const total = program.totalDays;
      return {
        completed,
        total,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },
    [savedPrograms]
  );

  // ============ STREAKS / WEEKLY ============
  const trainingDaysSet = useMemo(() => {
    const set = new Set<string>();
    sessions.forEach((s) => set.add(dayKeyFromDate(new Date(s.completedAt))));
    return set;
  }, [sessions]);

  const getCurrentStreak = useCallback(() => {
    if (trainingDaysSet.size === 0) return 0;
    let streak = 0;
    const today = new Date();
    const todayK = dayKeyFromDate(today);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = dayKeyFromDate(yesterday);

    // Streak counts only if user trained today OR yesterday (grace day).
    if (!trainingDaysSet.has(todayK) && !trainingDaysSet.has(yKey)) return 0;

    const cursor = new Date(today);
    if (!trainingDaysSet.has(todayK)) cursor.setDate(cursor.getDate() - 1);

    while (trainingDaysSet.has(dayKeyFromDate(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }, [trainingDaysSet]);

  const getLongestStreak = useCallback(() => {
    if (trainingDaysSet.size === 0) return 0;
    const sorted = Array.from(trainingDaysSet)
      .map((k) => new Date(k))
      .sort((a, b) => a.getTime() - b.getTime());
    let longest = 1;
    let current = 1;
    for (let i = 1; i < sorted.length; i++) {
      const diff = Math.round(
        (sorted[i].getTime() - sorted[i - 1].getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff === 1) {
        current++;
        longest = Math.max(longest, current);
      } else if (diff > 1) {
        current = 1;
      }
    }
    return longest;
  }, [trainingDaysSet]);

  const getThisWeekDays = useCallback((): boolean[] => {
    const start = startOfWeek(new Date());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return trainingDaysSet.has(dayKeyFromDate(d));
    });
  }, [trainingDaysSet]);

  const getTotalSessions = useCallback(() => sessions.length, [sessions]);

  const getSessionsThisWeek = useCallback(() => {
    const start = startOfWeek(new Date()).getTime();
    const end = start + 7 * 24 * 60 * 60 * 1000;
    return sessions.filter((s) => s.completedAt >= start && s.completedAt < end).length;
  }, [sessions]);

  const value = useMemo(
    () => ({
      savedPrograms,
      sessions,
      isSaved,
      saveProgram,
      removeProgram,
      toggleDay,
      isDayComplete,
      getProgress,
      count: savedPrograms.length,
      getCurrentStreak,
      getLongestStreak,
      getThisWeekDays,
      getTotalSessions,
      getSessionsThisWeek,
    }),
    [
      savedPrograms,
      sessions,
      isSaved,
      saveProgram,
      removeProgram,
      toggleDay,
      isDayComplete,
      getProgress,
      getCurrentStreak,
      getLongestStreak,
      getThisWeekDays,
      getTotalSessions,
      getSessionsThisWeek,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};
