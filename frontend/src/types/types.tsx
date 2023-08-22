export type Course = {
  id: number;
  title: string;
  description: string;
  category: "Beginner" | "Intermediate" | "Professional";
  instructorName: string;
  rating: number;
  duration: number;
  imgUrl: string;
  comments: CourseComment[];
};

export type CourseComment = {
  id: number;
  author: string;
  comment: string;
  comment_date_time: string;
  rating: number;
};

export interface FetchState<T> {
  state: "loading" | "complete" | "error";
  response: T | null;
  errorMessage: string | null;
}

export type ActionType<T> =
  | { type: "complete"; res: T }
  | { type: "error"; message: string };

export type BackendResponse<T> = T | backendErrorResponse;

export type backendErrorResponse = { message: string; status: "error" };
