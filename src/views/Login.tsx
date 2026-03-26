import { type ReactElement } from "react";
import { Row } from "../components/Row";
import { usePreSessionContext } from "../contexts/PreSessionContext";
import { Stack } from "../components/Stack";

export function Login(): ReactElement {
  const {
    sessionLoading,
    initialSessionId,
    setInitialSessionId,
    loadSession
  } = usePreSessionContext();

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Row>
        <input
          value={initialSessionId ?? ''}
          onChange={(e) => setInitialSessionId(e.target.value)}
          placeholder="Enter session id here..."
          disabled={sessionLoading}
        />
        <button
          onClick={loadSession}
          disabled={sessionLoading}
        >
          Submit
        </button>
      </Row>
    </Stack>
  );
}