import type { ReactElement } from "react";
import { Html } from "../../../components/Html";
import { Stack } from "../../../components/Stack";
import { useTaskViewContext } from "../../../contexts/TaskViewContext";

export function ProblemStatementBar(): ReactElement {
  const { problemStatementHTML } = useTaskViewContext();

  return (
    <Stack>
      <div className="section-title-wrapper section-border no-left-margin">
        Problem Statement
      </div>
      <div className="section-side-content-wrapper section-border no-left-margin">
        <Html html={problemStatementHTML} />
      </div>
    </Stack>
  );
}