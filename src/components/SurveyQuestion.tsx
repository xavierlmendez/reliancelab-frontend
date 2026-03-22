import type { ButtonHTMLAttributes, ReactElement } from "react";
import { Stack } from "./Stack";
import { Row } from "./Row";
import { useSurveyContext } from "../contexts/SurveyContext";

interface SurveyQuestionProps {
  id: string;
  text: string;
}

export function SurveyQuestion({ id, text }: SurveyQuestionProps): ReactElement {
  const {
    getQuestionAnswer,
    setQuestionAnswer,
  } = useSurveyContext();

  const answer = getQuestionAnswer(id);

  function getButtonClassName(buttonAnswer: string): string | undefined {
    return (answer === buttonAnswer)
      ? 'button-success button-success-filled'
      : undefined
  }

  function getButtonProps(buttonAnswer: string): ButtonHTMLAttributes<HTMLButtonElement> {
    return {
      className: getButtonClassName(buttonAnswer),
      onClick: () => setQuestionAnswer(id, buttonAnswer),
    };
  }

  return (
    <Stack gap={12} justifyContent="center">
      <i style={{ textAlign: 'center' }}>
        {text}
      </i>
      <Row>
        <button {...getButtonProps('strongly disagree')}>
          Strongly disagree
        </button>
        <button {...getButtonProps('disagree')}>
          Disagree
        </button>
        <button {...getButtonProps('agree')}>
          Agree
        </button>
        <button {...getButtonProps('strongly agree')}>
          Strongly agree
        </button>
      </Row>
    </Stack>
  );
}

