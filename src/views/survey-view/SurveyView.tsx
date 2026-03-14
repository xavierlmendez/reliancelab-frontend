import { useState, type ReactElement } from "react";
import { GraduationCapIcon } from "@phosphor-icons/react";
import { Stack } from "../../components/Stack";
import { useRoutingContext } from "../../contexts/RoutingContext";
import { useToastContext } from "../../contexts/ToastContext";

export function SurveyView(): ReactElement {
  const { pushToast } = useToastContext();
  const { navigateToNextRoute } = useRoutingContext();
  const [loading, setLoading] = useState<boolean>(false);

  function onClickSubmit() {
    setLoading(true);
    pushToast({ type: 'information', message: 'Saving Answers...', timeToLive: 1500 });

    /** @TODO implement backend saving logic here */
    setTimeout(() => {
      setLoading(false);
      pushToast({ type: 'success', message: 'Answers saved.', timeToLive: 1500 });
      navigateToNextRoute();
    }, 250);
  }

  return (
    <Stack gap={24} height="100vh" alignItems="center" justifyContent="center">
      <Stack gap={8} alignItems="center" >
        <h1>
          Congratulations!
        </h1>
        <GraduationCapIcon size={64} />
        <div>
          Please leave feedback on your experience in regards to your confidence in AI generated solutions.
        </div>
        <textarea style={{ height: 250, width: 500 }} />
        <div>
          Click 'Submit' to submit your answers.
        </div>
      </Stack>
      <button onClick={onClickSubmit} disabled={loading}>Submit</button>
    </Stack>
  );
}