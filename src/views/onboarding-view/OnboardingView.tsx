import type { ReactElement } from "react";
import { CheeseIcon } from "@phosphor-icons/react";
import { Stack } from "../../components/Stack";
import { useRoutingContext } from "../../contexts/RoutingContext";
import { SurveyQuestion } from "../../components/SurveyQuestion";

export function OnboardingView(): ReactElement {
  const { navigateToNextRoute } = useRoutingContext();

  return (
    <Stack gap={24} height="100vh" alignItems="center" justifyContent="center">
      <Stack gap={8} alignItems="center" >
        <h1>
          Welcome!
        </h1>
        <CheeseIcon size={64} />
        <div>
          Welcome to our assessment program.
        </div>
        <div>
          Please answer the questionnaire then click 'Start' to begin your tasks.
        </div>
      </Stack>
      <hr style={{ width: 500 }} />
      <SurveyQuestion id="trust" text="I trust AI to analyze code" />
      <hr style={{ width: 500 }} />
      <button onClick={navigateToNextRoute}>Start</button>
    </Stack>
  );
}