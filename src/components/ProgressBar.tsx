import type { CSSProperties, ReactElement } from "react";
import { Row } from "./Row";

interface ProgressBarProps {
  totalStages: number;
  stageIndex: number;
  gapped?: boolean;
  width?: CSSProperties['width'];
}

const SHARED_CSS_PROPS: CSSProperties = {
  height: 4,
  width: '100%',
};

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
            style={{
              ...SHARED_CSS_PROPS,
              backgroundColor: 'orange',
            }}
          />
        ))}
        {Array.from({ length: totalStages - stageIndex }, (_, i) => i).map((idx) => (
          <div
            key={`incomplete-${idx}`}
            style={{
              ...SHARED_CSS_PROPS,
              backgroundColor: 'grey',
            }}
          />
        ))}
      </Row>
    </div>
  );
}