import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";

interface LoadingContextValue {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const showLoading = useCallback(() => setCount((c) => c + 1), []);
  const hideLoading = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

  const value = useMemo<LoadingContextValue>(
    () => ({ isLoading: count > 0, showLoading, hideLoading }),
    [count, showLoading, hideLoading]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useGlobalLoading(): LoadingContextValue {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useGlobalLoading must be used within <LoadingProvider>");
  }
  return ctx;
}
