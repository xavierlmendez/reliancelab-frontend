import type { ReactElement } from "react";
import { Row } from "../../components/Row";
import { ProblemStatementBar } from "./elements/ProblemStatementBar";
import { AIInsightsBar } from "./elements/AIInsightsBar";
import { CodeDisplayArea } from "./elements/CodeDisplayArea";
import { Stack } from "../../components/Stack";
import { useTaskViewContext } from "../../contexts/TaskViewContext";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { TaskViewHeader } from "./elements/TaskViewHeader";
import { TaskViewFooter } from "./elements/TaskViewFooter";
import './TaskView.css';

export function TaskView(): ReactElement {
  const {
    totalTasks,
    taskIndex,
  } = useTaskViewContext();

  return (
    <Stack height="100vh">
      <TaskViewHeader />
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
      <TaskViewFooter />
    </Stack>
  );
}
