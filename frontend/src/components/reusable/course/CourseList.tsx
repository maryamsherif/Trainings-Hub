import CourseCard from "./CourseCard";
import { Course } from "../../../types/types";
import { Button } from "reactstrap";

export default function CourseList({
  courses,
  showPagination,
  decrementPage,
  incrementPage,
  pageNumber,
}: {
  courses: Course[];
  showPagination?: boolean;
  decrementPage?: () => void;
  incrementPage?: () => void;
  pageNumber?: number;
}) {
  const coursesList =
    courses &&
    courses.map((course) => (
      <CourseCard key={course.id} course={course}></CourseCard>
    ));

  return (
    <main className="flex gap-8 flex-wrap sm:gap-6 md:gap-4 justify-center w-full">
      {coursesList}
      {decrementPage && incrementPage && showPagination ? (
        <div className="flex justify-between w-full">
          {pageNumber === 0 ? null : (
            <Button onClick={decrementPage}>Previous Page</Button>
          )}
          <Button
            onClick={incrementPage}
            className={`${pageNumber === 0 ? "ml-auto" : ""}`}
          >
            Next Page
          </Button>
        </div>
      ) : null}
    </main>
  );
}
