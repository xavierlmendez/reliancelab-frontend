import { CaretLeftIcon, CaretRightIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { type ReactElement } from "react";
import { Row } from "../../../components/Row";
import { useTaskViewContext } from "../../../contexts/TaskViewContext";
import { useToastContext } from "../../../contexts/ToastContext";

export function TaskViewFooter(): ReactElement {
  const { pushToast } = useToastContext();

  const {
    loading,
    totalTasks,
    taskIndex,
    isFirstTask,
    isLastTask,
    userScore,
    showConfirmation,
    navigateNextTask,
    setShowConfirmation,
    navigatePreviousTask,
  } = useTaskViewContext();

  function onClickConfirmNo() {
    setShowConfirmation(false);
  }

  function onClickNext(): void {
    userScore ? setShowConfirmation(true) : showMissingScoreToast();
  }

  function showMissingScoreToast(): void {
    pushToast({ type: 'error', message: 'You must score the solution before proceeding.', timeToLive: 3000 });
  }

  return (
    <div className="task-view-footer">
      <Row gap={20} alignItems="center" justifyContent="center">
        {showConfirmation ? (
          <>
            <button className="button-error" onClick={onClickConfirmNo} disabled={loading}>
              <Row gap={4} alignItems="center" justifyContent="center">
                <XIcon />No
              </Row>
            </button>
            <i>
              Are you sure you want to <strong>{userScore}</strong> the solution?
            </i>
            <button className="button-success" onClick={navigateNextTask} disabled={loading}>
              <Row gap={4} alignItems="center" justifyContent="center">
                <CheckIcon />Yes
              </Row>
            </button>
          </>
        ) : (
          <>
            <button onClick={navigatePreviousTask} disabled={loading || isFirstTask}>
              <Row gap={4} alignItems="center" justifyContent="center">
                <CaretLeftIcon />Previous
              </Row>
            </button>
            <div>
              {`Task ${taskIndex} of ${totalTasks}`}
            </div>
            <button onClick={onClickNext} disabled={loading}>
              <Row gap={4} alignItems="center" justifyContent="center">
                {isLastTask ? 'Finish' : 'Next'}<CaretRightIcon />
              </Row>
            </button>
          </>
        )}
      </Row>
    </div>
  );
}