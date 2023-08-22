import { useEffect } from "react";
import useFetch from "../../custom-hooks/useFetch";
import { Course, BackendResponse } from "../../types/types";
import SearchBar from "../reusable/SearchBar/SearchBar";
import CourseList from "../reusable/course/CourseList";
import { useCourseContext } from "../../context/courseContext";

export default function HomePage() {
  const { setCourses, courses } = useCourseContext();
  const data = useFetch<BackendResponse<Course[]>>({
    endpoint: "course/getAllCourses",
  });
  useEffect(() => {
    if (data.state === "complete" && Array.isArray(data.response)) {
      setCourses(data.response as Course[]);
    }
  }, [data.state]);
  let result;
  if (data.state === "loading") {
    result = <div>Loading...</div>;
  }

  if (data.state === "error" && data.errorMessage) {
    result = <div>{data.errorMessage}</div>;
  }

  if (courses.length === 0) {
    result = (
      <div className="flex items-center justify-center w-full text-gray-800">
        No courses found!
      </div>
    );
  }

  return (
    <main className="flex flex-col mb-10 sm:flex-row">
      <SearchBar />
      {result || <CourseList courses={courses}></CourseList>}
    </main>
  );
}
