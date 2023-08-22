import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { fetchDataFromAPI } from "../../utils";
import { Course } from "../../types/types";
import CommentList from "../reusable/comment/CommentList";

export default function CoursePage() {
  const course = useLoaderData() as Course;
  console.log(course);
  return (
    <main className="px-16">
      <div className="flex justify-center bg-slate-600/30 p-8 rounded-lg w-[70%] mb-8 mx-auto">
        <img
          className="w-full max-w-[960px] h-auto rounded-md"
          src={
            course.imgUrl ||
            "https://img-b.udemycdn.com/course/240x135/1362070_b9a1_2.jpg"
          }
          alt={course.title}
        />
      </div>
      <h1 className="text-[40px] font-bold text-gray-700">{course.title}</h1>
      <p className="text-md text-gray-600 mb-2">🙎🏻‍♂️ {course.instructorName}</p>
      <p className="text-md text-gray-500 mb-3">{course.description}</p>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1">
          <span>⭐️</span>
          <span
            title={`ratings ${course.rating.toFixed(1)}`}
            className="text-lg text-gray-500"
          >
            {course.rating.toFixed(1)}
          </span>
        </div>
        <div className="rounded-lg text-md bg-white flex items-center gap-[2px]">
          <span>🕐</span>
          <span className=" text-gray-500">{course.duration}h</span>
        </div>
      </div>
      <CommentList comments={course.comments}></CommentList>
    </main>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  return fetchDataFromAPI({
    endpoint: `course/getCourseById/${params.courseId}`,
  });
}
