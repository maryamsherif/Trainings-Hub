/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { fetchDataFromAPI } from "../../utils";
import { Course, backendSuccessResponse } from "../../types/types";
import CommentList from "../reusable/comment/CommentList";
import AddComment from "../reusable/comment/AddComment";
import ReviewStarsContextProvider from "../../context/ReviewStarsContext";
import { useContext, useEffect, useState } from "react";
import { CourseContext } from "../../context/CourseContext";
import DeleteModal from "../reusable/modal/DeleteModal";
import { Button } from "reactstrap";
import EditModal from "../reusable/modal/EditModal";

export default function CoursePage() {
  const { currentCourse: course, courseSetters } = useContext(CourseContext);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigation = useNavigate();

  const { response: _course } =
    useLoaderData() as unknown as backendSuccessResponse<Course>;
  useEffect(() => {
    if (_course?.id) {
      courseSetters?.setCurrentCourse(_course);
    }
  }, [_course]);

  async function deleteCourse() {
    try {
      const id = course?.id;
      if (id) {
        const response = await fetchDataFromAPI({
          endpoint: `course/deleteCourse/${id}`,
          configurationOpt: { method: "DELETE" },
        });
        if (response.message === "Success") {
          courseSetters?.deleteCourse(course as Course);
          navigation("..");
        } else {
          setError(response.errorMessage);
        }
      }
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <main className="px-16 relative">
      <div className="flex justify-center  bg-slate-600/30 p-8 rounded-lg w-[70%] mb-8 mx-auto">
        <img
          className="w-full max-w-[960px] h-auto rounded-md"
          src={
            course.imgUrl ||
            "https://img-b.udemycdn.com/course/240x135/1362070_b9a1_2.jpg"
          }
          alt={course.title}
        />
      </div>
      <h1 className="text-[40px] font-bold text-gray-700">{course?.title}</h1>
      <p className="text-md text-gray-600 mb-2">🙎🏻‍♂️ {course?.instructorName}</p>
      <p className="text-md text-gray-500 mb-3">{course?.description}</p>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-1">
          <span>⭐️</span>
          <span
            title={`ratings ${course.rating?.toFixed(1)}`}
            className="text-lg text-gray-500"
          >
            {course.rating?.toFixed(1)}
          </span>
        </div>
        <div className="rounded-lg text-md bg-white flex items-center gap-[2px]">
          <span>🕐</span>
          <span className=" text-gray-500">{course?.duration}h</span>
        </div>
      </div>
      <CommentList comments={course?.comments}></CommentList>
      <ReviewStarsContextProvider>
        <AddComment
          course={course}
          setCourse={
            courseSetters?.setCurrentCourse as (course: Course) => void
          }
        />
      </ReviewStarsContextProvider>
      <DeleteModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        onDeleteClick={deleteCourse}
        error={error}
      />
      <EditModal show={showEditModal} setShow={setShowEditModal} />
      <div className="absolute top-6 right-4 flex flex-col gap-2">
        <Button color="primary" onClick={() => setShowEditModal(true)}>
          Edit Course 📝
        </Button>
        <Button color="danger" onClick={() => setShowDeleteModal(true)}>
          Delete Course 🗑️
        </Button>
      </div>
    </main>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  return fetchDataFromAPI({
    endpoint: `course/getCourseById/${params.courseId}`,
  });
}
