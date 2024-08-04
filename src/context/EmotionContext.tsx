import { createContext, useState, useContext, ReactNode, useMemo } from 'react';

interface EmotionContextType {
  shouldRefetch: boolean;
  setShouldRefetch: (value: boolean) => void;
}

const EmotionContext = createContext<EmotionContextType>({
  shouldRefetch: false,
  setShouldRefetch: () => {},
});

export function EmotionProvider({ children }: { children: ReactNode }) {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const value = useMemo(() => ({ shouldRefetch, setShouldRefetch }), [shouldRefetch]);

  return <EmotionContext.Provider value={value}>{children}</EmotionContext.Provider>;
}

export function useEmotionContext() {
  return useContext(EmotionContext);
}
