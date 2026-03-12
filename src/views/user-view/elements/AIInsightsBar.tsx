import type { ReactElement } from "react";
import { Stack } from "../../../components/Stack";
import { CactusIcon } from "@phosphor-icons/react";

export function AIInsightsBar(): ReactElement {
  return (
    <Stack>
      <div className="section-title-wrapper section-border">
        AI Insights
      </div>
      <div className="section-side-content-wrapper section-border">
        <div className="insight-actions-wrapper">
          <button>Find issues</button>
          <button>Do a code review</button>
          <button>Explain the code</button>
        </div>
      </div>
      <div className="section-side-content-wrapper section-border">
        <div className="no-insights-wrapper">
          <Stack alignItems="center">
            <CactusIcon size={32} />
            <div className="sub-text">
              No code insights yet...
            </div>
          </Stack>
        </div>
      </div>
    </Stack>
  );
}