import { createContext, useContext, useEffect, useState, type Dispatch, type ReactElement, type ReactNode, type SetStateAction } from "react"
import { useGetSession } from "../hooks/serverFunctions";
import { useToastContext } from "./ToastContext";
import { useRoutingContext } from "./RoutingContext";

const SESSION_ID_KEY = 'SESSION_ID';

interface PreSessionProviderProps {
  children: ReactNode,
}

interface PreSessionContextValue {
  sessionData: ReturnType<typeof useGetSession>[0]['data'];
  sessionLoading: boolean;
  initialSessionId: string | null;
  setInitialSessionId: Dispatch<SetStateAction<string | null>>;
  loadSession: () => void;
}

const PreSessionContext = createContext<PreSessionContextValue>(
  {} as PreSessionContextValue
);

export function PreSessionProvider({ children }: PreSessionProviderProps): ReactElement {
  const { pushToast } = useToastContext();
  const { navigateToRoute } = useRoutingContext();
  const [initialSessionId, setInitialSessionId] = useState<string | null>(getStoredSessionId());

  const [{
    data: sessionData,
    loading: sessionLoading,
    error: sessionError,
  }, getSession] = useGetSession();

  function getStoredSessionId(): string | null {
    return localStorage.getItem(SESSION_ID_KEY);
  }

  function setStoredSessionId(sessionId: string): void {
    localStorage.setItem(SESSION_ID_KEY, sessionId)
  }

  function loadSession(): void {
    pushToast({ type: 'information', message: 'Loading session...', timeToLive: 1500 });
    getSession(undefined, { session_id: initialSessionId ?? '' });
  }

  useEffect(() => {
    if (sessionData) {
      pushToast({ type: 'success', message: 'Session loaded', timeToLive: 1500 });
      setStoredSessionId(sessionData.sessionId);

      if (sessionData.taskIndex > 0) {
        navigateToRoute('task');
      } else {
        navigateToRoute('onboarding');
      }
    }
  }, [sessionData]);

  useEffect(() => {
    if (sessionError) {
      pushToast({ type: 'error', message: 'Failed to load session', timeToLive: 1500 });
    }
  }, [sessionError])

  useEffect(() => {
    if (initialSessionId) {
      loadSession();
    }
  }, [])

  const contextValue = {
    sessionData,
    sessionLoading,
    initialSessionId,
    setInitialSessionId,
    loadSession,
  };

  return (
    <PreSessionContext.Provider value={contextValue}>
      {children}
    </PreSessionContext.Provider>
  );
}

export function usePreSessionContext() {
  const contextValue = useContext(PreSessionContext);
  return contextValue;
}