import { createContext, useContext, useState, type ReactElement, type ReactNode } from "react"

type TQuestionId = string;
type TQuestionAnswer = string;

interface SurveyProviderProps {
  children: ReactNode,
}

interface SurveyContextValue {
  questionAnswers: Record<TQuestionId, TQuestionAnswer>;
  getQuestionAnswer: (questionId: TQuestionId) => TQuestionAnswer;
  setQuestionAnswer: (questionId: TQuestionId, answer: TQuestionAnswer) => void;
  allQuestionsAnswered: () => boolean;
}

const SurveyContext = createContext<SurveyContextValue>(
  {} as SurveyContextValue
);

export function SurveyProvider({ children }: SurveyProviderProps): ReactElement {
  const [questionAnswers, setQuestionAnswers] = useState<SurveyContextValue['questionAnswers']>({});

  function getQuestionAnswer(questionId: TQuestionId): TQuestionAnswer {
    return questionAnswers[questionId] ?? '';
  }

  function setQuestionAnswer(questionId: TQuestionId, answer: TQuestionAnswer): void {
    setQuestionAnswers((prevQuestionAnswers) => {
      return { ...prevQuestionAnswers, [questionId]: answer };
    });
  }

  function allQuestionsAnswered(): boolean {
    return Object.values(questionAnswers).every((answer) => answer);
  }

  const contextValue = {
    questionAnswers,
    getQuestionAnswer,
    setQuestionAnswer,
    allQuestionsAnswered,
  };

  return (
    <SurveyContext.Provider value={contextValue}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurveyContext() {
  const contextValue = useContext(SurveyContext);
  return contextValue;
}