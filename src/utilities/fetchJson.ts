export interface FetchJsonProps<TBody> {
  url: string,
  method: 'GET' | 'POST'
  body?: TBody;
}

export type FetchJsonReturn<TJson> = {
  type: 'success',
  data: TJson,
} | {
  type: 'fail',
  error: Error,
}

export async function fetchJson<TBody, TJson>({
  url,
  method,
  body,
}: FetchJsonProps<TBody>): Promise<FetchJsonReturn<TJson>> {
  return fetch(url, {
    method: method as string,
    headers: { 'Content-Type': 'application/json' },
    ...body ? { body: JSON.stringify(body) } : {}
  })
    .then((response) => {
      if (response.ok) return response;
      throw new Error(response.statusText);
    })
    .then(async (response) => {
      return response.json()
        .then((data) => ({ type: 'success', data }))
    })
    .catch((error) => {
      console.error(error);
      return { type: 'fail', error };
    });
}