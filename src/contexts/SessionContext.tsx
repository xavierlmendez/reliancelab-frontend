import { createContext, useContext, type ReactElement, type ReactNode } from "react"
import { useGetSession } from "../hooks/serverFunctions";

interface SessionProviderProps {
  children: ReactNode;
}

type SessionContextValue = (
  NonNullable<ReturnType<typeof useGetSession>[0]['data']>
);

const SessionContext = createContext<SessionContextValue>(
  {} as SessionContextValue
);

export function SessionProvider({ children }: SessionProviderProps): ReactElement | null {
  const [{ data: sessionData, loading: sessionLoading }] = useGetSession();

  if (!sessionData || sessionLoading) {
    return null;
  }

  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const contextValue = useContext(SessionContext);
  return contextValue;
}