import { createContext, useContext, useState, type ReactElement, type ReactNode } from "react";
import type { Route } from "../types/Route";

const VIEW_ORDER: Route[] = [
  'onboarding',
  'task',
  'survey',
  'complete',
];

interface RoutingContextValue {
  currentRoute: Route;
  navigateToNextRoute: () => void;
  navigateToPreviousRoute: () => void;
}

const RoutingContext = createContext<RoutingContextValue>(
  {} as RoutingContextValue
);

export function RoutingProvider({ children }: { children: ReactNode }): ReactElement {
  const [currentRoute, setCurrentRoute] = useState<Route>('onboarding');
  
  function navigateToNextRoute() {
    const nextViewIndex = Math.min(VIEW_ORDER.findIndex((v) => v === currentRoute) + 1, VIEW_ORDER.length - 1)
    setCurrentRoute(VIEW_ORDER[nextViewIndex])
  }

  function navigateToPreviousRoute() {
    const previousViewIndex = Math.min(VIEW_ORDER.findIndex((v) => v === currentRoute) - 1, 0)
    setCurrentRoute(VIEW_ORDER[previousViewIndex])
  }

  const contextValue = {
    currentRoute,
    navigateToNextRoute,
    navigateToPreviousRoute,
  };

  return (
    <RoutingContext.Provider value={contextValue}>
      {children}
    </RoutingContext.Provider>
  );
}

export function useRoutingContext() {
  const contextValue = useContext(RoutingContext);
  return contextValue;
}