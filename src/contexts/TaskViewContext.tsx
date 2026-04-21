import { createContext, useContext, useEffect, useState, type Dispatch, type ReactElement, type ReactNode, type SetStateAction } from "react";
import { useToastContext } from "./ToastContext";
import type { UserScore } from "../types/UserScore";
import { useRoutingContext } from "./RoutingContext";
import { useSessionContext } from "./SessionContext";
import { useGetTask, usePostTask, type TaskResponse } from "../hooks/serverFunctions";
import { useFetchContext } from "./FetchContext";
import { logEvent } from "../utilities/logEvent";

interface TaskViewContextValue extends TaskResponse {
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
  const { sessionId, taskIndex: initialTaskIndex } = useSessionContext();
  const { endpoint } = useFetchContext();

  const [taskData, setTaskData] = useState<TaskResponse>();
  const [userScore, setUserScore] = useState<UserScore | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [{ data: getTaskData, loading: getTaskLoading }, getTask] = useGetTask();
  const [{ data: postTaskData, loading: postTaskLoading }, postTask] = usePostTask();

  const loading = getTaskLoading || postTaskLoading;
  const isFirstTask = taskData!! && (taskData.taskIndex === 0);
  const isLastTask = taskData!! && (taskData.taskIndex === (taskData.totalTasks - 1));

  useEffect(() => {
    // retrieve initial task data
    getTask(undefined, { session_id: sessionId, task_index: initialTaskIndex });
  }, []);

  useEffect(() => {
    // sets initial task data
    if (getTaskData) {
      setTaskData(getTaskData);
      logEvent(endpoint, sessionId, 'task_load', taskData?.taskId, { score: userScore });
    }
  }, [getTaskData]);

  useEffect(() => {
    // sets next task data
    if (postTaskData) {
      showScoreSavedToast();
      resetSelectionStates();
      setTaskData(postTaskData);

      if (isLastTask) {
        navigateToNextRoute();
      } else {
        logEvent(endpoint, sessionId, 'task_load', taskData?.taskId, { score: userScore });
      }
    }
  }, [postTaskData])

  function navigateNextTask(): void {
  if (!loading && userScore) {
    showSavingScoreToast();

    postTask({
      sessionId,
      userScore,
      taskId: taskData!.taskId
    });
    if (!loading && userScore) {
      logEvent(endpoint, sessionId, 'decision_submit', taskData?.taskId, { score: userScore });
      showSavingScoreToast();

      postTask({
        sessionId,
        userScore,
        taskId: taskData!.taskId
      });
    }
  }
}

  function navigatePreviousTask(): void {
    if (!loading && !isFirstTask) {
      showProceedingToPreviousTaskToast();
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
    pushToast({ type: 'information', message: 'Proceeding to previous task...' });
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