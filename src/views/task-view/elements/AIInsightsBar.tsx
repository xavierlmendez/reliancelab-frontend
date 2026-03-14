import type { ReactElement } from "react";
import { EmptyIcon } from "@phosphor-icons/react";
import { Stack } from "../../../components/Stack";

export function AIInsightsBar(): ReactElement {
  return (
    <Stack>
      <div className="section-title section-border no-right-margin">
        AI Insights
      </div>
      <div className="section-side-content section-border no-right-margin">
        <button>Find issues</button>
        <button>Do a code review</button>
        <button>Explain the code</button>
      </div>
      <div className="section-side-content section-border no-right-margin">
        <Stack gap={8} height="100%" alignItems="center" justifyContent="center">
          <EmptyIcon size={32} />
          <div>No code insights yet...</div>
        </Stack>
      </div>
    </Stack>
  );
}