import type { UserScore } from "../types/UserScore";
import { useFetchJson } from "./useFetchJson";

type TaskResponse = {
  totalTasks: number;
  taskIndex: number;
  taskId: string;
  problemStatementHtml: string;
  codeSnippet: string;
};

export const useGetSession = () => (
  useFetchJson<undefined, TaskResponse & {
    sessionID: string;
  }>({
    route: 'session',
    method: 'GET',
  })
);

export const useGetTask = () => (
  useFetchJson<undefined, TaskResponse>({
    route: 'task',
    method: 'GET',
  })
);

export const usePostTask = () => (
  useFetchJson<{
    sessionId: string;
    userScore: UserScore;
    taskId: string;
  }, TaskResponse>({
    route: 'task',
    method: 'POST',
  })
);

export const usePostChat = () => (
  useFetchJson<{
    session_id: string;
    prompt: string;
  }, {
    response: string;
  }>({
    route: 'chat',
    method: 'POST',
    url: '/api/chat',
  })
);

export const usePostOnboarding = () => (
  useFetchJson<{
    session_id: string;
    responses: {
      additionalProp1: string;
    }
  }, {
    success: boolean;
  }>({
    route: 'onboarding',
    method: 'POST',
  })
);

export const usePostSurvey = () => (
  useFetchJson<{
    session_id: string;
    responses: {
      additionalProp1: string;
    }
  }, {
    success: boolean;
  }>({
    route: 'survey',
    method: 'POST',
  })
);

export const useGetHealth = () => (
  useFetchJson<undefined, {
    ok: boolean;
    service: string;
    framework: string;
    port: number;
  }>({
    route: 'health',
    method: 'GET',
  })
);