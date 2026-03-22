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

export const usePostTask = (body: {
  sessionId: string;
  userScore: UserScore;
  taskId: string;
}) => (
  useFetchJson<typeof body, TaskResponse>({
    route: 'task',
    method: 'POST',
  })
);

export const usePostChat = (body: {
  session_id: string;
  prompt: string;
}) => (
  useFetchJson<typeof body, {
    response: string;
  }>({
    route: 'chat',
    method: 'POST',
  })
);

export const usePostOnboarding = (body: {
  session_id: string;
  responses: {
    additionalProp1: string;
  }
}) => (
  useFetchJson<typeof body, {
    success: boolean;
  }>({
    route: 'onboarding',
    method: 'POST',
  })
);

export const usePostSurvey = (body: {
  session_id: string;
    responses: {
    additionalProp1: string;
  }
}) => (
  useFetchJson<typeof body, {
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