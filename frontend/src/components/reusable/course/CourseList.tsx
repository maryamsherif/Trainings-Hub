import Card from "../layout/Card";
import CourseCard from "./CourseCard";
import { Course } from "../../../types/types";

export default function CourseList({ courses }: { courses: Course[] }) {
  const coursesList =
    courses &&
    courses.map((course) => (
      <CourseCard key={course.id} course={course}></CourseCard>
    ));
  return (
    <Card className="flex gap-8 flex-wrap sm:gap-6 md:gap-4 justify-center">
      {coursesList}
    </Card>
  );
}
