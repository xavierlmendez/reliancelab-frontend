import type { ReactElement } from "react";
import { Row } from "../../components/Row";
import { ProblemStatementBar } from "./elements/ProblemStatementBar";
import { AIInsightsBar } from "./elements/AIInsightsBar";
import { CodeViewer } from "./elements/CodeViewer";
import './UserView.css';

export function UserView(): ReactElement {
  return (
    <Row>
      <ProblemStatementBar />
      <CodeViewer />
      <AIInsightsBar />
    </Row>
  )
}
