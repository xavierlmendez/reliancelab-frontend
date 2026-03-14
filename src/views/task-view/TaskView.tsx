import type { ReactElement } from "react";
import { Row } from "../../components/Row";
import { ProblemStatementBar } from "./elements/ProblemStatementBar";
import { AIInsightsBar } from "./elements/AIInsightsBar";
import { CodeDisplayArea } from "./elements/CodeDisplayArea";
import { Stack } from "../../components/Stack";
import './TaskView.css';
import { useTaskViewContext } from "../../contexts/TaskViewContext";
import { ProgressBar } from "../../components/ProgressBar";

export function TaskView(): ReactElement {
  const {
    totalTasks,
    taskIndex,
    navigateNextTask,
    navigatePriorTask,
  } = useTaskViewContext()

  return (
    <Stack height="100vh">
      <Row flexGrow>
        <ProblemStatementBar />
        <CodeDisplayArea />
        <AIInsightsBar />
      </Row>
      <ProgressBar
        width="100vw"
        totalStages={totalTasks}
        stageIndex={taskIndex}
      />
      <div className="task-view-footer-wrapper">
        <Row gap={8} alignItems="center" justifyContent="end">
          <button onClick={navigatePriorTask}>Previous</button>
          <button onClick={navigateNextTask}>Next</button>
        </Row>
      </div>
    </Stack>
  );
}
