import { createContext, useContext, useEffect, useState, type ReactElement, type ReactNode } from "react";
import { MOCK_CODE_SNIPPET, MOCK_PROBLEM_STATEMENT_HTML } from "../constants/MockUserViewData";

interface UserViewContextValue {
  problemStatementHTML: string;
  codeSnippet: string;
}

export const UserViewContext = createContext<UserViewContextValue>({} as UserViewContextValue);

export function useUserViewContext() {
  const contextValue = useContext(UserViewContext);
  if (!contextValue) throw new Error('User View Context must be used inside a User View Context Provider')
  return contextValue;
}

export function UserViewProvider({ children }: { children: ReactNode }): ReactElement | null {
  const [serverData, setServerData] = useState<UserViewContextValue>();

  useEffect(() => {
    // @TODO implement backend retrieval logic here when ready
    setServerData({
      problemStatementHTML: MOCK_PROBLEM_STATEMENT_HTML,
      codeSnippet: MOCK_CODE_SNIPPET,
    });
  }, []);

  if (!serverData) {
    return null;
  }

  return (
    <UserViewContext.Provider value={serverData}>
      {children}
    </UserViewContext.Provider>
  )
}