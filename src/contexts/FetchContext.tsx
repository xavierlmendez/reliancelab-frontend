import { createContext, useContext, type ReactElement, type ReactNode } from "react"

interface FetchProviderProps {
  children: ReactNode,
  endpoint: string,
}

interface FetchContextValue {
  endpoint: string
}

const FetchContext = createContext<FetchContextValue>(
  {} as FetchContextValue
);

export function FetchProvider({ children, endpoint }: FetchProviderProps): ReactElement {
  const contextValue = {
    endpoint,
  };

  return (
    <FetchContext.Provider value={contextValue}>
      {children}
    </FetchContext.Provider>
  );
}

export function useFetchContext() {
  const contextValue = useContext(FetchContext);
  return contextValue;
}