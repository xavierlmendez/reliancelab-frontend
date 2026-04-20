import { useEffect, type ReactElement } from "react";
import { GraduationCapIcon } from "@phosphor-icons/react";
import { Stack } from "../components/Stack";
import { useRoutingContext } from "../contexts/RoutingContext";
import { useToastContext } from "../contexts/ToastContext";
import { SurveyQuestion } from "../components/SurveyQuestion";
import { usePostSurvey } from "../hooks/serverFunctions";
import { useSessionContext } from "../contexts/SessionContext";
import { useSurveyContext } from "../contexts/SurveyContext";
import { SurveyFreeResponse } from "../components/SurveyFreeResponse";

export function SurveyView(): ReactElement {
  const { sessionId } = useSessionContext();
  const { pushToast } = useToastContext();
  const { navigateToNextRoute } = useRoutingContext();
  const { questionAnswers, allQuestionsAnswered } = useSurveyContext();
  const [{ data: surveyData, loading: surveyLoading }, postSurvey] = usePostSurvey();

  useEffect(() => {
    if (surveyData) onPostSuccess();
  }, [surveyData])

  function onClickSubmit() {
    pushToast({ type: 'information', message: 'Saving Answers...', timeToLive: 1500 });
    postSurvey({ session_id: sessionId, responses: questionAnswers });
  }

  function onPostSuccess() {
    pushToast({ type: 'success', message: 'Answers saved.', timeToLive: 1500 });
    navigateToNextRoute();
  }

  return (
    <Stack gap={24} height="100vh" alignItems="center" justifyContent="center">
      <Stack gap={8} alignItems="center" >
        <h1>
          Congratulations!
        </h1>
        <GraduationCapIcon size={64} />
        <div>
          Please answer the questionnaire then click 'Submit' to finalize your answers.
        </div>
      </Stack>
      <hr style={{ width: 500 }} />
      <Stack gap={32}>
        <SurveyQuestion
          id="confidence"
          text="I was confident in the AI generated solutions and explanations."
        />
        <SurveyQuestion
          id="perceived_familiarity"
          text="I felt that the AI generated explanations were easy to interpret."
        />
        <SurveyQuestion
          id="workload"
          text="I felt comfortable with the workload presented."
        />
        <SurveyFreeResponse
          id="freeform"
          text="Please share any additional thoughts or feedback."
        />
      </Stack>
      <hr style={{ width: 500 }} />
      <button
        onClick={onClickSubmit}
        disabled={surveyLoading || !allQuestionsAnswered()}
      >
        Submit
      </button>
    </Stack>
  );
}