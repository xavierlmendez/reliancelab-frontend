import { useState, useEffect, type ReactElement } from "react";
import { AtomIcon, EmptyIcon } from "@phosphor-icons/react";
import { Stack } from "../../../components/Stack";
import { Row } from "../../../components/Row";
import { usePostChat } from "../../../hooks/serverFunctions";
import { useSessionContext } from "../../../contexts/SessionContext";
import { useTaskViewContext } from "../../../contexts/TaskViewContext";
import { useFetchContext } from "../../../contexts/FetchContext";
import { logEvent } from "../../../utilities/logEvent";

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function AIInsightsBar(): ReactElement {
  const { sessionId } = useSessionContext();
  const { problemStatementHtml, taskId } = useTaskViewContext();
  const { endpoint } = useFetchContext();
  const [promptText, setPromptText] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [{ data, loading }, request] = usePostChat();

  useEffect(() => {
    if (data?.response) {
      setResponse(data.response);
    }
  }, [data]);

  function composePrompt(userInput: string): string {
    const question = stripHtml(problemStatementHtml ?? '');
    if (!question) return userInput;
    return `Task context: ${question}\n\n${userInput}`;
  }

  function submitPrompt(userInput = promptText) {
    setPromptText('');
    logEvent(endpoint, sessionId, 'chat_submit', taskId, { prompt: userInput });
    request({ session_id: sessionId, prompt: composePrompt(userInput) });
  }

  function onInputKeyDown(key: string) {
    if (key === 'Enter') submitPrompt();
  }

  return (
    <Stack>
      <div className="section-title section-border no-right-margin">
        AI Insights
      </div>
      <div className="section-side-content section-border no-right-margin">
        <button onClick={() => {
          logEvent(endpoint, sessionId, 'suggestion_click', taskId, { suggestion: 'find code issues' });
          submitPrompt('find code issues');
        }}>
          Find issues
        </button>
        <button onClick={() => {
          logEvent(endpoint, sessionId, 'suggestion_click', taskId, { suggestion: 'do a code review' });
          submitPrompt('do a code review');
        }}>
          Do a code review
        </button>
        <button onClick={() => {
          logEvent(endpoint, sessionId, 'suggestion_click', taskId, { suggestion: 'explain the code' });
          submitPrompt('explain the code');
        }}>
          Explain the code
        </button>
      </div>
      <div className="section-side-content section-border no-right-margin">
        <Stack height="100%">
          <Stack gap={8} flexGrow alignItems="center" justifyContent="center">
            {loading ? (
              <>
                <AtomIcon size={32} />
                <div>loading...</div>
              </>
            ) : response ? (
              <div>{response}</div>
            ) : (
              <>
                <EmptyIcon size={32} />
                <div>No code insights yet...</div>
              </>
            )}
          </Stack>
          <Row>
            <input
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key)}
              placeholder="Type your prompt here..."
            />
          </Row>
        </Stack>
      </div>
    </Stack>
  );
}
