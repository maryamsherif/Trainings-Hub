import { baseURL } from "./config";

export async function fetchDataFromAPI({
  endpoint,
  configurationOpt = {},
}: {
  endpoint: string;
  configurationOpt?: RequestInit;
}) {
  try {
    const res = await fetch(`${baseURL}/${endpoint}`, configurationOpt);
    const data = await res.json();
    return data;
  } catch (error) {
    // console.error(error);
    return { error };
  }
}

export function convertIsoString(isoString: string) {
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
