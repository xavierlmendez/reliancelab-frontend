import { useState, useEffect, type ReactElement } from "react";
import { AtomIcon, EmptyIcon } from "@phosphor-icons/react";
import { Stack } from "../../../components/Stack";
import { Row } from "../../../components/Row";
import { usePostChat } from "../../../hooks/serverFunctions";
import { useTaskViewContext } from "../../../contexts/TaskViewContext";

export function AIInsightsBar(): ReactElement {
  const { sessionID } = useTaskViewContext();
  const [promptText, setPromptText] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [{ data, loading }, request] = usePostChat();

  useEffect(() => {
    if (data?.response) {
      setResponse(data.response);
    }
  }, [data]);

  function submitPrompt(prompt = promptText) {
    setPromptText('');
    request({ session_id: sessionID, prompt });
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
        <button onClick={() => submitPrompt('find code issues')}>
          Find issues
        </button>
        <button onClick={() => submitPrompt('do a code review')}>
          Do a code review
        </button>
        <button onClick={() => submitPrompt('explain the code')}>
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
