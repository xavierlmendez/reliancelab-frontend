import { createContext, useContext, useState, type ReactElement, type ReactNode } from "react"
import { v4 as uuid } from "uuid";
import type { NotificationType } from "../types/NotificationType";

// toast time-to-live in ms
const DEFAULT_TOAST_TIME_TO_LIVE = 2000;

interface ToastData {
  type: NotificationType;
  message: string;
  timeToLive?: number;
}

export interface ToastEntity extends ToastData {
  id: string;
  alive: boolean;
  timeToLive: number;
}

interface ToastContextValue {
  allToasts: ToastEntity[],
  aliveToasts: ToastEntity[],
  pushToast: (t: ToastData) => void;
  killToast: (t: ToastEntity) => void;
  deleteToast: (t: ToastEntity) => void;
}

const ToastContext = createContext<ToastContextValue>(
  {} as ToastContextValue
);

export function ToastProvider({ children }: { children: ReactNode }): ReactElement {
  const [allToasts, setAllToasts] = useState<ToastEntity[]>([]);
  const aliveToasts = allToasts.filter((t) => t.alive);

  /* pushes toast to the end of the toast array */
  function pushToast(toastData: ToastData) {
    setAllToasts((prevToasts) => {
      const timeToLive = toastData?.timeToLive ?? DEFAULT_TOAST_TIME_TO_LIVE;
      const newToast = { ...toastData, id: uuid(), alive: true, timeToLive };
      const newToasts = [...prevToasts, newToast];
      return newToasts;
    });
  }

  /* marks toast as dead, but does not remove it from the array */
  function killToast(toastEntity: ToastEntity) {
    setAllToasts((prevToasts) => {
      const newToasts = [...prevToasts];
      const toast = newToasts.find((t) => t === toastEntity);
      if (toast) toast.alive = false;
      return newToasts;
    });
  }

  /* removes the toast from the array */
  function deleteToast(toastEntity: ToastEntity) {
    setAllToasts((prevToasts) => {
      const newToasts = [...prevToasts];
      return newToasts.filter((t) => t !== toastEntity);
    });
  };

  const contextValue = {
    allToasts,
    aliveToasts,
    pushToast,
    killToast,
    deleteToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const contextValue = useContext(ToastContext);
  return contextValue;
}