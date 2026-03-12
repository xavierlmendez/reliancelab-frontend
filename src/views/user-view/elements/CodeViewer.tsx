import CodeMirror from '@uiw/react-codemirror';
import type { ReactElement } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { Stack } from "../../../components/Stack";
import { useUserViewContext } from "../../../contexts/UserViewContext";

const extensions = [javascript({ jsx: true })];

export function CodeViewer(): ReactElement {
  const { codeSnippet } = useUserViewContext();

  return (
    <Stack flexGrow>
      <div className="section-title-wrapper section-border">
        Code
      </div>
      <div className="section-main-content-wrapper section-border">
        <CodeMirror
          extensions={extensions}
          height='90vh'
          theme='dark'
          value={codeSnippet}
          editable={false}
        />
      </div>
    </Stack>
  );
}