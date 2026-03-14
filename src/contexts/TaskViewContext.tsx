import { createContext, useContext, useEffect, useState, type ReactElement, type ReactNode } from "react";
import { getMockTaskData } from "../constants/MockTaskData";

interface TaskData {
  totalTasks: number;
  taskIndex: number;
  taskID: string;
  problemStatementHTML: string;
  codeSnippet: string;
}

interface TaskViewContextValue extends TaskData {
  navigateNextTask: () => void;
  navigatePriorTask: () => void;
}

export const TaskViewContext = createContext<TaskViewContextValue>(
  {} as TaskViewContextValue
);

export function TaskViewProvider({ children }: { children: ReactNode }): ReactElement | null {
  const [taskData, setTaskData] = useState<TaskData>();

  useEffect(() => {
    // @TODO implement backend retrieval logic here when ready
    setTaskData(getMockTaskData());
  }, []);

  function navigateNextTask(): void {
    // @TODO implement backend logic for retrieving next task
    console.log('navigating to next task');
  }

  function navigatePriorTask(): void {
    // @TODO implement backend logic for retrieving previous task
    console.log('navigating to prior task');
  }

  if (!taskData) {
    return null;
  }

  const contextValue = {
    ...taskData,
    navigateNextTask,
    navigatePriorTask,
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