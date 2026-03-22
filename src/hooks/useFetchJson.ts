import { useEffect, useState } from "react";
import { fetchJson, type FetchJsonProps } from "../utilities/fetchJson";
import { useFetchContext } from "../contexts/FetchContext";

interface useFetchJsonProps {
  method: FetchJsonProps<any>['method'],
  route: string;
  lazy?: boolean
}

export function useFetchJson<TBody, TJson>({ route, method, lazy = false }: useFetchJsonProps) {
  const { endpoint } = useFetchContext();

  const [data, setData] = useState<TJson>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (method === 'GET' && !lazy) request();
  }, [method])

  function request(body?: any) {
    setLoading(true);

    fetchJson<TBody, TJson>({
      url: `${endpoint}/${route}`,
      method,
      body
    })
      .then((response) => {
        setLoading(false);

        switch (response.type) {
          case 'success': {
            setData(response.data);
            setError(undefined);
            break;
          }
          case 'fail': {
            setData(undefined);
            setError(response.error);
            break;
          }
        }
      });
  }

  return [{ data, loading, error }, request] as const;
}