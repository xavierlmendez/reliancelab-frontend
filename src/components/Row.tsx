import type { CSSProperties, ReactElement, ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  flexGrow?: boolean;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: CSSProperties['gap'];
}

export function Row({
  children,
  flexGrow,
  ...cssProps
}: RowProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: flexGrow ? 1 : 0,
        justifyContent: cssProps.justifyContent ?? 'space-between',
        ...cssProps,
      }}
    >
      {children}
    </div>
  );
}