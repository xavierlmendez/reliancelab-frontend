import type { ReactElement } from "react";
import { Stack } from "../components/Stack";
import { useRoutingContext } from "../contexts/RoutingContext";
import { NewspaperClippingIcon } from "@phosphor-icons/react";

export function InstructionsView(): ReactElement {
  const { navigateToNextRoute } = useRoutingContext();
  

  return (
    <Stack gap={24} height="100vh" alignItems="center" justifyContent="center">
      <h1>
        Before you start...
      </h1>
      <NewspaperClippingIcon size={64} />
      <Stack gap={16} alignItems="center" justifyContent="center">
        <div>
          You are about to begin your tasks.
        </div>
        <div>
          Each task has a <strong>problem statement</strong> and a <strong>solution</strong>.
        </div>
        <div>
          Your objective is to rate your confidence in the solution and to either <strong>accept</strong> or <strong>reject</strong> it.
        </div>
        <div>
          After completing a task, the next task will show.
        </div>
      </Stack>
      <button onClick={navigateToNextRoute}>
        Let me begin!
      </button>
    </Stack>
  );
}