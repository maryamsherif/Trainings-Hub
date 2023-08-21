export type Course = {
  id: number;
  title: string;
  description: string;
  category: "Beginner" | "Intermediate" | "Professional";
  instructorName: string;
  ratings: number;
};

export interface FetchState<T> {
  state: "loading" | "complete" | "error";
  response: T | null;
  errorMessage: string | null;
}
export type ActionType<T> =
  | { type: "complete"; res: T }
  | { type: "error"; message: string };
