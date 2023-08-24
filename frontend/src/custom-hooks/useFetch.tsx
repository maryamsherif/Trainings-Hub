import { useEffect, useReducer } from "react";
import { baseURL } from "../utils/config";
import { ActionType, BackendResponse, FetchState } from "../types/types";

const initialState: FetchState<null> = {
  state: "loading",
  response: null,
  errorMessage: null,
};

function reducerFunction<T>(
  state: FetchState<T>,
  action: ActionType<T>
): FetchState<T> {
  switch (action.type) {
    case "complete":
      return {
        response: action.res,
        state: action.type,
        errorMessage: null,
      };
    case "error":
      return {
        response: null,
        state: action.type,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}

async function fetchData<T>({
  endpoint,
  configurationOpt,
  dispatch,
  signal,
}: {
  endpoint: string;
  configurationOpt: RequestInit;
  dispatch: React.Dispatch<ActionType<T>>;
  signal: AbortSignal;
}) {
  try {
    const response = (await fetch(`${baseURL}/${endpoint}`, {
      ...configurationOpt,
      signal,
    })) as Response;

    if (!response.ok) {
      dispatch({ type: "error", message: response.message as string });
      return;
    }

    const data: BackendResponse<T> = await response.json();

    if (!data) return;

    dispatch({ type: "complete", res: data as T });
  } catch (err) {
    const error = err as Error;
    const errorMessage = `An error occurred: ${
      error.message || "Unknown error"
    }`;

    dispatch({ type: "error", message: errorMessage });
  }
}

export default function useFetch<T>({
  endpoint,
  configurationOpt = {},
}: {
  endpoint: string;
  configurationOpt?: RequestInit;
  callback?: (data: T | null) => T | null;
}): FetchState<T> {
  const [fetchState, dispatch] = useReducer(reducerFunction, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData<T>({ endpoint, configurationOpt, dispatch, signal });

    return () => controller.abort();
  }, [endpoint]);

  return fetchState as FetchState<T>;
}
