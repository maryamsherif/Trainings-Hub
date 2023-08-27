/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";
import useFetch from "../../custom-hooks/useFetch";
import { Course, backendSuccessResponse } from "../../types/types";
import SearchBar from "../reusable/searchBar/SearchBar.tsx";
import CourseList from "../reusable/course/CourseList";
import { CourseContext } from "../../context/CourseContext";
import DeleteModal from "../reusable/modal/DeleteModal.tsx";

export default function HomePage() {
  const { courseSetters, courses } = useContext(CourseContext);
  const data = useFetch<backendSuccessResponse<Course[]>>({
    endpoint: "course/getAllCourses",
  });
  useEffect(() => {
    if (data.state === "complete" && Array.isArray(data.response?.response)) {
      courseSetters?.setCourses(data.response?.response as Course[]);
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
  console.log({ courses });

  return (
    <main className="flex flex-col mb-10 sm:flex-row">
      <SearchBar />
      {result || <CourseList courses={courses}></CourseList>}
    </main>
  );
}
