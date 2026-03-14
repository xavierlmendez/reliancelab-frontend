import type { ReactElement } from "react";
import { ThumbsDownIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import { Row } from "../../../components/Row";
import { useTaskViewContext } from "../../../contexts/TaskViewContext";

export function TaskViewHeader(): ReactElement {
  const {
    userScore,
    showConfirmation,
    setUserScore,
  } = useTaskViewContext();

  return (
    <div className="task-view-header">
      <Row gap={24} alignItems="center" justifyContent="space-between">
        <i>
          Review the solution code with the assistance of AI insights then
          choose to <strong>reject</strong> or <strong>approve</strong> the solution.
        </i>
        <Row gap={8} alignItems="center" justifyContent="end">
          <button
            className={`button-error${userScore === 'reject' ? ' button-error-filled' : ''}`}
            onClick={() => setUserScore('reject')}
            disabled={showConfirmation}
          >
            <Row gap={4} alignItems="center" justifyContent="center">
              <ThumbsDownIcon />Reject
            </Row>
          </button>
          <button
            className={`button-success${userScore === 'approve' ? ' button-success-filled' : ''}`}
            onClick={() => setUserScore('approve')}
            disabled={showConfirmation}
          >
            <Row gap={4} alignItems="center" justifyContent="center">
              <ThumbsUpIcon />Approve
            </Row>
          </button>
        </Row>
      </Row>
    </div>
  );
}