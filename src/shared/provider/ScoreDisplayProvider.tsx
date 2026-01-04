'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ScoreDisplayMode = 'APPROVED' | 'PENDING' | 'COMBINED';

interface ScoreDisplayContextType {
  mode: ScoreDisplayMode;
  setMode: (mode: ScoreDisplayMode) => void;
}

const ScoreDisplayContext = createContext<ScoreDisplayContextType | undefined>(undefined);

export function ScoreDisplayProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ScoreDisplayMode>('COMBINED');
  useEffect(() => {
    const savedMode = localStorage.getItem('gsmc_score_display_mode') as ScoreDisplayMode;
    if (savedMode && ['APPROVED', 'PENDING', 'COMBINED'].includes(savedMode)) {
      setModeState(savedMode);
    }
  }, []);
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
