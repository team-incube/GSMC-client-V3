'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

export type ScoreDisplayMode = 'ACTUAL' | 'PENDING' | 'COMBINED';

interface ScoreDisplayContextType {
  mode: ScoreDisplayMode;
  setMode: (mode: ScoreDisplayMode) => void;
}

const ScoreDisplayContext = createContext<ScoreDisplayContextType | undefined>(undefined);

export function ScoreDisplayProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ScoreDisplayMode>(() => {
    if (typeof window === 'undefined') return 'COMBINED';
    const savedMode = localStorage.getItem('gsmc_score_display_mode') as ScoreDisplayMode;
    return savedMode && ['ACTUAL', 'PENDING', 'COMBINED'].includes(savedMode)
      ? savedMode
      : 'COMBINED';
  });

  const setMode = useCallback((newMode: ScoreDisplayMode) => {
    setModeState(newMode);
    localStorage.setItem('gsmc_score_display_mode', newMode);
  }, []);

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

  return <ScoreDisplayContext.Provider value={value}>{children}</ScoreDisplayContext.Provider>;
}

export function useScoreDisplay() {
  const context = useContext(ScoreDisplayContext);
  if (context === undefined) {
    throw new Error('useScoreDisplay must be used within a ScoreDisplayProvider');
  }
  return context;
}
