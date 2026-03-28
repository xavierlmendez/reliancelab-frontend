const FRONTEND_SECRET = import.meta.env.VITE_FRONTEND_SECRET ?? 'unset';

export interface FetchJsonProps<TBody> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: TBody;
}

export type FetchJsonReturn<TJson> = {
  type: 'success';
  data: TJson;
} | {
  type: 'fail';
  error: Error;
}

export async function fetchJson<TBody, TJson>({
  url,
  method,
  body,
}: FetchJsonProps<TBody>): Promise<FetchJsonReturn<TJson>> {
  return fetch(url, {
    method: method as string,
    headers: {
      'Content-Type': 'application/json',
      'X-Frontend-Secret': FRONTEND_SECRET,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
    .then((response) => {
      if (response.ok) return response;
      throw new Error(response.statusText);
    })
    .then(async (response) => {
      return response.json()
        .then((data) => ({ type: 'success' as const, data }));
    })
    .catch((error: unknown) => {
      console.error(error);
      return { type: 'fail' as const, error: error instanceof Error ? error : new Error(String(error)) };
    });
}
