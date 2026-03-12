import type { CSSProperties, ReactElement, ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  flexGrow?: boolean;
  alignItems?: CSSProperties['alignItems']
  gap?: CSSProperties['gap']
}

export function Stack({
  children,
  flexGrow,
  ...cssProps
}: StackProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: flexGrow ? 1 : 0,
        justifyContent: 'space-between',
        ...cssProps,
      }}
    >
      {children}
    </div>
  );
}