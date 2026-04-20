import { useEffect, type ReactElement } from "react";
import { CheeseIcon } from "@phosphor-icons/react";
import { Stack } from "../components/Stack";
import { useRoutingContext } from "../contexts/RoutingContext";
import { SurveyQuestion } from "../components/SurveyQuestion";
import { useSurveyContext } from "../contexts/SurveyContext";
import { usePostOnboarding } from "../hooks/serverFunctions";
import { useToastContext } from "../contexts/ToastContext";
import { useSessionContext } from "../contexts/SessionContext";

export function OnboardingView(): ReactElement {
  const { sessionId } = useSessionContext();
  const { pushToast } = useToastContext();
  const { navigateToNextRoute } = useRoutingContext();
  const { questionAnswers, allQuestionsAnswered } = useSurveyContext();
  const [{ data: onboardingData, loading: onboardingLoading }, postOnboarding] = usePostOnboarding();

  useEffect(() => {
    if (onboardingData) onPostSuccess();
  }, [onboardingData]);

  function onClickStart() {
    pushToast({ type: 'information', message: 'Saving Answers...', timeToLive: 1500 });
    postOnboarding({ session_id: sessionId, responses: questionAnswers });

    /** @TODO delete setTimeout when postOnboarding works */
    setTimeout(onPostSuccess, 250);
  }

  function onPostSuccess() {
    pushToast({ type: 'success', message: 'Answers saved.', timeToLive: 1500 });
    navigateToNextRoute();
  }

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
      <Stack gap={32}>
        <SurveyQuestion
          id="ai_familiarity"
          text="I am familiar with AI assisted tooling like Copilot and ChatGPT."
        />
        <SurveyQuestion
          id="trust_baseline"
          text="I trust AI to analyze, review, and explain code."
        />
        <SurveyQuestion
          id="technical_comfort"
          text="I am comfortable reading/working with small excerpts of code."
        />
      </Stack>
      <hr style={{ width: 500 }} />
      <button
        disabled={onboardingLoading || !allQuestionsAnswered()}
        onClick={onClickStart}
      >
        Start
      </button>
    </Stack>
  );
}