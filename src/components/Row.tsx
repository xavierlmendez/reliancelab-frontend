import type { CSSProperties, ReactElement, ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  flexGrow?: boolean;
  alignItems?: CSSProperties['alignItems']
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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexGrow: flexGrow ? 1 : 0,
        justifyContent: 'space-between',
        ...cssProps,
      }}
    >
      { children}
    </div>
  )
}