import { createContext, useContext, useEffect, useState, type Dispatch, type ReactElement, type ReactNode, type SetStateAction } from "react";
import { getMockTaskData } from "../constants/MockTaskData";
import { useToastContext } from "./ToastContext";
import type { UserScore } from "../types/UserScore";
import { useRoutingContext } from "./RoutingContext";

interface TaskData {
  totalTasks: number;
  taskIndex: number;
  taskID: string;
  sessionID: string;
  problemStatementHTML: string;
  codeSnippet: string;
}

interface TaskViewContextValue extends TaskData {
  loading: boolean;
  isFirstTask: boolean;
  isLastTask: boolean;
  userScore: UserScore | null;
  showConfirmation: boolean;
  setUserScore: Dispatch<SetStateAction<UserScore | null>>;
  setShowConfirmation: Dispatch<SetStateAction<boolean>>;
  navigateNextTask: () => void;
  navigatePreviousTask: () => void;
}

const TaskViewContext = createContext<TaskViewContextValue>(
  {} as TaskViewContextValue
);

export function TaskViewProvider({ children }: { children: ReactNode }): ReactElement | null {
  const { pushToast } = useToastContext();
  const { navigateToNextRoute } = useRoutingContext();

  const [loading, setLoading] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<TaskData>();
  const [userScore, setUserScore] = useState<UserScore | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const isFirstTask = taskData!! && (taskData.taskIndex === 0);
  const isLastTask = taskData!! && (taskData.taskIndex === (taskData.totalTasks - 1));

  useEffect(() => {
    /** @TODO implement backend retrieval logic here */
    setTaskData(getMockTaskData());
  }, []);

  function navigateNextTask(): void {
    if (!loading && userScore) {
      setLoading(true);
      showSavingScoreToast();

      /** @TODO implement backend saving and retrieval logic here */
      setTimeout(() => {
        setLoading(false);
        showScoreSavedToast();
        resetSelectionStates();
        if (isLastTask) navigateToNextRoute();
      }, 250);
    }
  }

  function navigatePreviousTask(): void {
    if (!loading && !isFirstTask) {
      setLoading(true);
      showProceedingToPreviousTaskToast();

      /** @TODO implement backend retrieval logic here */
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  }

  function resetSelectionStates() {
    setUserScore(null);
    setShowConfirmation(false);
  }

  function showSavingScoreToast() {
      pushToast({ type: 'information', message: 'Saving Score...', timeToLive: 1500 });
  }

  function showScoreSavedToast() {
    pushToast({ type: 'success', message: 'Score saved.', timeToLive: 1500 });
  }

  function showProceedingToPreviousTaskToast() {
    pushToast({ type: 'information',  message: 'Proceeding to previous task...' });
  }

  if (!taskData) {
    return null;
  }

  const contextValue = {
    ...taskData,
    loading,
    isFirstTask,
    isLastTask,
    userScore,
    showConfirmation,
    setUserScore,
    setShowConfirmation,
    navigateNextTask,
    navigatePreviousTask,
  };

  return (
    <TaskViewContext.Provider value={contextValue}>
      {children}
    </TaskViewContext.Provider>
  )
}

export function useTaskViewContext() {
  const contextValue = useContext(TaskViewContext);
  return contextValue;
}