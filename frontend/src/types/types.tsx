export type Course = {
  id: number;
  title: string;
  description: string;
  category: "Beginner" | "Intermediate" | "Professional";
  instructorName: string;
  rating: number;
  duration: number;
  imgUrl: string;
};

export interface FetchState<T> {
  state: "loading" | "complete" | "error";
  response: T | null;
  errorMessage: string | null;
}

export type ActionType<T> =
  | { type: "complete"; res: T }
  | { type: "error"; message: string };

export type CoursesResponse = Course[] | backendErrorResponse;

export type backendErrorResponse = { message: string; status: "error" };
