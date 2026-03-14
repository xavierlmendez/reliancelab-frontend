import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import type { ReactElement } from "react";
import { Row } from "../../../components/Row";
import { useTaskViewContext } from "../../../contexts/TaskViewContext";

export function TaskViewFooter(): ReactElement {
  const {
    loading,
    totalTasks,
    taskIndex,
    isFirstTask,
    isLastTask,
    navigateNextTask,
    navigatePreviousTask,
  } = useTaskViewContext();

  return (
    <div className="task-view-footer">
      <Row gap={20} alignItems="center" justifyContent="center">
        <button onClick={navigatePreviousTask} disabled={loading || isFirstTask}>
          <Row gap={4} alignItems="center" justifyContent="center">
            <CaretLeftIcon />Previous
          </Row>
        </button>
        <div>
          {`Task ${taskIndex + 1} of ${totalTasks}`}
        </div>
        <button onClick={navigateNextTask} disabled={loading}>
          <Row gap={4} alignItems="center" justifyContent="center">
            {isLastTask ? 'Finish' : 'Next'}<CaretRightIcon />
          </Row>
        </button>
      </Row>
    </div>
  );
}