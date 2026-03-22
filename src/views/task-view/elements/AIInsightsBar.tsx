import { useState, type ReactElement } from "react";
import { AtomIcon, EmptyIcon } from "@phosphor-icons/react";
import { Stack } from "../../../components/Stack";
import { Row } from "../../../components/Row";

export function AIInsightsBar(): ReactElement {
  const [promptText, setPromptText] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  function submitPrompt(prompt = promptText) {
    setPromptText('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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