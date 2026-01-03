'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ScoreDisplayMode = 'ACTUAL' | 'PENDING' | 'COMBINED';

interface ScoreDisplayContextType {
  mode: ScoreDisplayMode;
  setMode: (mode: ScoreDisplayMode) => void;
}

const ScoreDisplayContext = createContext<ScoreDisplayContextType | undefined>(undefined);

export function ScoreDisplayProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ScoreDisplayMode>('COMBINED');

  useEffect(() => {
    const savedMode = localStorage.getItem('gsmc_score_display_mode') as ScoreDisplayMode;
    if (savedMode && ['ACTUAL', 'PENDING', 'COMBINED'].includes(savedMode)) {
      setModeState(savedMode);
    } else {
      setModeState('COMBINED');
    }
  }, []);

  const setMode = (newMode: ScoreDisplayMode) => {
    setModeState(newMode);
    localStorage.setItem('gsmc_score_display_mode', newMode);
  };

  return (
    <ScoreDisplayContext.Provider value={{ mode, setMode }}>
      {children}
    </ScoreDisplayContext.Provider>
  );
}

export function useScoreDisplay() {
  const context = useContext(ScoreDisplayContext);
  if (context === undefined) {
    throw new Error('useScoreDisplay must be used within a ScoreDisplayProvider');
  }
  return context;
}
