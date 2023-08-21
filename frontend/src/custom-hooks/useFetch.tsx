import { useEffect, useReducer } from "react";
import { baseURL } from "../utils/config";
import { ActionType, FetchState } from "../types/types";

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
    const response = await fetch(`${baseURL}${endpoint}`, {
      ...configurationOpt,
      signal,
    });

    if (!response.ok) {
      dispatch({ type: "error", message: response.message });
      return;
    }

    const data = await response.json();

    if (!data) return;

    dispatch({ type: "complete", res: data });
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
  callback,
}: {
  endpoint: string;
  configurationOpt?: RequestInit;
  callback?: (data: T | null) => T | null;
}): FetchState<T> {
  const [fetchState, dispatch] = useReducer(reducerFunction, initialState);
  let modifiedFetchState: FetchState<T> | undefined;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData<T>({ endpoint, configurationOpt, dispatch, signal });

    return () => controller.abort();
  }, [endpoint]);

  if (callback && fetchState.response) {
    const newData = callback(fetchState.response);

    if (newData) {
      modifiedFetchState = { ...fetchState, response: newData };
    }
  }

  return modifiedFetchState || fetchState;
}
