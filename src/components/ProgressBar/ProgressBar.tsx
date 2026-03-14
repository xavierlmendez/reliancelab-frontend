import type { CSSProperties, ReactElement } from "react";
import { Row } from "../Row";
import "./ProgressBar.css";

interface ProgressBarProps {
  totalStages: number;
  stageIndex: number;
  gapped?: boolean;
  width?: CSSProperties['width'];
}

export function ProgressBar({
  totalStages,
  stageIndex,
  gapped,
  width = 200,
}: ProgressBarProps): ReactElement {
  return (
    <div style={{ width }}>
      <Row gap={gapped ? 6 : 0} justifyContent="center">
        {Array.from({ length: stageIndex }, (_, i) => i).map((idx) => (
          <div
            key={`complete$-${idx}`}
            className="progress-bar-segment segment-complete"
          />
        ))}
        {Array.from({ length: totalStages - stageIndex }, (_, i) => i).map((idx) => (
          <div
            key={`incomplete-${idx}`}
            className="progress-bar-segment segment-incomplete"
          />
        ))}
      </Row>
    </div>
  );
}