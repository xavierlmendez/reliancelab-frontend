import CodeMirror from '@uiw/react-codemirror';
import type { ReactElement } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { Stack } from "../../../components/Stack";
import { useTaskViewContext } from "../../../contexts/TaskViewContext";

const extensions = [javascript({ jsx: true })];

export function CodeDisplayArea(): ReactElement {
  const { codeSnippet } = useTaskViewContext();

  return (
    <Stack flexGrow>
      <div className="section-title section-border">
        Code
      </div>
      <div className="section-main-content section-border">
        <CodeMirror
          style={{ height: "100%" }}
          extensions={extensions}
          height='100%'
          theme='dark'
          value={codeSnippet}
          editable={false}
        />
      </div>
    </Stack>
  );
}