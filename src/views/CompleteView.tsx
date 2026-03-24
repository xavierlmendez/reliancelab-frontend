import type { ReactElement } from "react";
import { CheersIcon } from "@phosphor-icons/react";
import { Stack } from "../components/Stack";

export function CompleteView(): ReactElement {
  return (
    <Stack gap={24} height="100vh" alignItems="center" justifyContent="center">
      <Stack gap={8} alignItems="center" >
        <h1>
          Thank you!
        </h1>
        <CheersIcon size={64} />
        <div>
          Your answers have been recorded.
        </div>
        <div>
          You may now close this tab.
        </div>
      </Stack>
    </Stack>
  );
}