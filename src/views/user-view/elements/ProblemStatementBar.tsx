import type { ReactElement } from "react";
import { Html } from "../../../components/Html";
import { Stack } from "../../../components/Stack";
import { useUserViewContext } from "../../../contexts/UserViewContext";

export function ProblemStatementBar(): ReactElement {
  const { problemStatementHTML } = useUserViewContext();

  return (
    <Stack>
      <div className="section-title-wrapper section-border">
        Problem Statement
      </div>
      <div className="section-side-content-wrapper section-border">
        <Html html={problemStatementHTML} />
      </div>
    </Stack>
  );
}