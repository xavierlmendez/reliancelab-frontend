import { useEffect, type ReactElement } from "react";
import { Stack } from "./Stack";
import { useSurveyContext } from "../contexts/SurveyContext";

interface SurveyFreeResponseProps {
  id: string;
  text: string;
}

export function SurveyFreeResponse({ id, text }: SurveyFreeResponseProps): ReactElement {
  const {
    getQuestionAnswer,
    setQuestionAnswer,
  } = useSurveyContext();

  const answer = getQuestionAnswer(id);

  useEffect(() => {
    // automatically subscribe this question as entry in the context on component mount
    setQuestionAnswer(id, "");
  }, [])

  return (
    <Stack gap={12} justifyContent="center">
      <i style={{ textAlign: 'center' }}>
        {text}
      </i>
      <textarea
        value={answer ?? ''}
        onChange={(e) => setQuestionAnswer(id, e.target.value)}
        placeholder="Enter response here..."
      />
    </Stack>
  )
}